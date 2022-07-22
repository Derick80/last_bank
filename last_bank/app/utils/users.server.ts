import { prisma } from "./prisma.server";
import type { RegisterForm } from "./types.server";
import bcrypt from "bcryptjs";
import { Profile, User } from "@prisma/client";

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,

      password: passwordHash,
      profile: {
        create: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    },
  });
  return { id: newUser.id, email: user.email };
};

export const getAllUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },

    include: {
      bills: true,
      incomes: true,
      accounts: true,
      profile: true,
    },
  });

  return { data };
};

export const getUserProfile = async (userId: string) => {
  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return profile;
};

export const updateUser = async (userId: string, profile: Partial<Profile>) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: profile,
      },
    },
  });
};
// app/utils/user.server.ts
// ...
export const deleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id } });
};
