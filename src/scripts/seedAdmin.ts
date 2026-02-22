import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: "amdinMoheb",
      email: "adminmoheb@gmail.com",
      password: "admin1234",
      role: UserRole.admin,
    };

    const isAdminExist = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });
    if (isAdminExist) {
      throw new Error("User Already Exists");
    }
    const admin = await prisma.user.create({
      data: adminData,
    });
    console.log("Admin Created Successfully", admin);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
