import { prisma } from "../../../config/db";
import { Blog, Prisma } from "../../../generated/prisma";


const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const result = await prisma.blog.create({
        data: payload,
    })

    return result;
}



const getAllBlogs = async ({page = 1, limit = 10, search, isFeatured, tags}: {page?: number, limit?: number, search?: string, isFeatured?: boolean, tags?: string[]}) => {
    
    const skip = (page -1) * limit;
    const where: any = {
        AND: [
            search && {
                OR: [
                    {title: {contains: search, mode: 'insensitive'}},
                    {content: {contains: search, mode: 'insensitive'}}
                ]
            },
            typeof isFeatured === "boolean" && {isFeatured},
            (tags && tags.length > 0) && {tags: { hasEvery: tags}}
        ].filter(Boolean)
    }


    
    const result = await prisma.blog.findMany({skip, take: limit, where,
    orderBy: {
        createdAt: "desc"
    }
});
const total = await prisma.blog.count({where})
    return {
        data: result,
        pagination: {
            page, limit, total, totalPage: Math.ceil(total/limit)
        }
    };
};

const getBlogById = async (id: number) => {
    return await prisma.$transaction(async(tnx) => {
        await tnx.blog.update({
            where: { id },
            data: {
                views: { increment: 1 }
            }
        });
        
        return await prisma.blog.findUnique({
            where: { id }
        });
    })   
};

const updateBlog = async (id: number, data: Partial<any>) => {
    return prisma.blog.update({ where: { id }, data });
};

const deleteBlog = async (id: number) => {
    return prisma.blog.delete({ where: { id } });
};




export const BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
}