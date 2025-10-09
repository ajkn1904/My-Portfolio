import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../../config/db";
import {
  IAdminInfo,
  IAdminInfoUpdatePayload,
  IExperience,
  ISkill,
} from "./admin.interface";
import { InputJsonValue } from "@prisma/client/runtime/library";

// Get admin info
const getAdminInfo = async (): Promise<IAdminInfo> => {
  const adminInfo = await prisma.adminInfo.findUnique({
    where: { id: 1 },
  });

  if (!adminInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin info not found");
  }

  return {
    ...adminInfo,
    experiences: adminInfo.experiences as IExperience[] | null,
    skills: adminInfo.skills as ISkill[] | null,
  };
};

// Update admin info

const updateAdminInfo = async (
  payload: IAdminInfoUpdatePayload
): Promise<IAdminInfo> => {
  const adminInfo = await prisma.adminInfo.findUnique({
    where: { id: 1 },
  });

  if (!adminInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin info not found");
  }

  const updatedInfo = await prisma.adminInfo.update({
    where: { id: 1 },
    data: {
      name: payload.name ?? adminInfo.name,
      email: payload.email ?? adminInfo.email,
      officialEmail: payload.officialEmail ?? adminInfo.officialEmail,
      contact: payload.contact ?? adminInfo.contact,
      photoUrl: payload.photoUrl ?? adminInfo.photoUrl,
      address: payload.address ?? adminInfo.address,
      institution: payload.institution ?? adminInfo.institution,
      degree: payload.degree ?? adminInfo.degree,
      cgpa: payload.cgpa ?? adminInfo.cgpa,
      github: payload.github ?? adminInfo.github,
      linkedin: payload.linkedin ?? adminInfo.linkedin,
      stackoverflow: payload.stackoverflow ?? adminInfo.stackoverflow,
      // ✅ Correctly cast JSON fields
      experiences: payload.experiences
        ? (payload.experiences as unknown as InputJsonValue)
        : (adminInfo.experiences) ?? undefined,
      skills: payload.skills
        ? (payload.skills as unknown as InputJsonValue)
        : (adminInfo.skills) ?? undefined,
    },
  });

  return {
    ...updatedInfo,
    experiences: updatedInfo.experiences as IExperience[] | null,
    skills: updatedInfo.skills as ISkill[] | null,
  };
};

export const AdminService = {
  getAdminInfo,
  updateAdminInfo,
};
