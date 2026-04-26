import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

interface userInfo {
  name: string;
  email: string;
  password: string;
}
const register = async (payload: userInfo) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (existingUser) {
    throw new Error("User Already Exists in DB");
  }
  const result = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });
  const { password, ...userData } = result;
  return userData;
};

const login = async (payload: userInfo) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User not found, please Register First");
  }

  const matchPassword = await bcrypt.compare(payload.password, user.password);

  if (!matchPassword) {
    throw new Error("Password not matched...");
  }
  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = await jwt.sign(userInfo, config.secret as string, {
    expiresIn: "7d",
  });

  const { password, ...userData } = user;

  return {
    token,
    userData,
  };
};

export const authService = {
  register,
  login,
};
