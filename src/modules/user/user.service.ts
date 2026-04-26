import { prisma } from "../../lib/prisma";

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const updateProfile = async (userId: string, payload: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId, status: "ACTIVE" },
  });

  if (!isUserExist) {
    throw new Error("User not found or inactive!");
  }

  const updateData: any = {};
  if (payload.name) updateData.name = payload.name;

  const result = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return result;
};

export const userService = {
  getAllUser,
  updateProfile,
};
