import type { Income, User } from "@prisma/client";
import { prisma } from "./prisma.server";
import type { CreateIncome } from "./types.server";

export const getUserIncome = async (userId: string) => {
  const userIncomes = await prisma.income.findMany({
    where: { userId: userId },
    orderBy: {
      due_date: "asc",
    },
  });
  return { userIncomes };
};
export async function createIncome({
  source,
  accountNumber,
  amount,
  due_date,
  recurring,
  paid,
  description,
  userId,
}: CreateIncome) {
  return prisma.income.create({
    data: {
      source,
      accountNumber,
      amount,
      due_date,
      recurring,
      paid,
      description,
      userId,
      user: {
        connect: { id: userId },
      },
    },
  });
}

export async function getOneUserIncome({
  id,
  userId,
}: Pick<Income, "id"> & {
  userId: User["id"];
}) {
  return prisma.income.findFirst({
    where: { id, userId },
  });
}

export const updateOneUserIncome = async ({
  id,
  userId,
  source,
  accountNumber,
  description,
  amount,
  paid,
  due_date,
}: Partial<Income>) => {
  await prisma.income.update({
    where: {
      id: id,
    },
    data: {
      source: source,
      accountNumber: accountNumber,
      description: description,
      amount: amount,
      due_date: due_date,
      paid: paid,
    },
  });
};
