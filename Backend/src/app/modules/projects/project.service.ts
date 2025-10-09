import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IProject } from "./project.interface";
import { prisma } from "../../../config/db";



const createProject = async (payload: IProject) => {
  return await prisma.$transaction(async(tx) => {
    const { name, img, liveLink, githubLink, intro, techStacks, details, uiImages } = payload;

    const isExist = await tx.project.findFirst({ where: { name } });
    if (isExist) throw new AppError(StatusCodes.BAD_REQUEST, "Project with this name already exists");

    const newProject = await tx.project.create({
        data: {
        name,
        img,
        liveLink,
        githubLink,
        intro,
        techStacks: {
            create: techStacks?.map((stack) => ({ name: stack })),
        },
        details: {
            create: details?.map((text) => ({ text })),
        },
        uiImages: {
            create: uiImages?.map((value) => ({ value })),
        },
        },
        include: { techStacks: true, details: true, uiImages: true },
    });

    return newProject;
  })
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProjects = async (query: Record<string, any>) => {
  const projects = await prisma.project.findMany({
    include: { techStacks: true, details: true, uiImages: true },
  });

  const total = await prisma.project.count();

  return {
    projects,
    meta: { total },
  };
};



const getSingleProject = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { techStacks: true, details: true, uiImages: true },
  });

  if (!project) throw new AppError(StatusCodes.NOT_FOUND, "Project not found");

  return { data: project };
};



const updateProject = async (id: number, payload: Partial<IProject>) => {
  return await prisma.$transaction(async (tx) => {
    const existingProject = await tx.project.findUnique({
      where: { id },
      include: { techStacks: true, details: true, uiImages: true },
    });

    if (!existingProject) {
      throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
    }

    const {
      name,
      img,
      liveLink,
      githubLink,
      intro,
      techStacks,
      details,
      uiImages,
    } = payload;


    const updatedProject = await tx.project.update({
      where: { id },
      data: {
        name: name ?? existingProject.name,
        img: img ?? existingProject.img,
        liveLink: liveLink ?? existingProject.liveLink,
        githubLink: githubLink ?? existingProject.githubLink,
        intro: intro ?? existingProject.intro,
      },
    });

    if (techStacks) {
      await tx.techStack.deleteMany({ where: { projectId: id } });
      await tx.techStack.createMany({
        data: techStacks.map((stack) => ({
          name: stack,
          projectId: id,
        })),
      });
    }

    if (details) {
      await tx.projectDetail.deleteMany({ where: { projectId: id } });
      await tx.projectDetail.createMany({
        data: details.map((text) => ({
          text,
          projectId: id,
        })),
      });
    }

    if (uiImages) {
      await tx.uiImage.deleteMany({ where: { projectId: id } });
      await tx.uiImage.createMany({
        data: uiImages.map((value) => ({
          value,
          projectId: id,
        })),
      });
    }

   
    const finalProject = await tx.project.findUnique({
      where: { id },
      include: {
        techStacks: true,
        details: true,
        uiImages: true,
      },
    });

    return finalProject;
  });
};



const deleteProject = async (id: number) => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new AppError(StatusCodes.NOT_FOUND, "Project not found");

  await prisma.project.delete({ where: { id } });
  return { message: "Project deleted successfully" };
};



export const projectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
