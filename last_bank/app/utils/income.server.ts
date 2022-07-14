import type { Income, User } from "@prisma/client";
import { prisma } from "./prisma.server";
import { CreateIncome, IncomeForm } from "./types.server";

export const getUserIncome = async (userId: string) => {
  const userIncomes = await prisma.income.findMany({
    where: { userId: userId },
    orderBy: {
      payment_date: "asc",
    },
  });
  return { userIncomes };
};
export async function createIncome({
  source,
  description,
  amount,
  payment_date,
  received,
  userId,
}: CreateIncome) {
  return prisma.income.create({
    data: {
      source,
      description,
      amount,
      payment_date,
      received,
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
  description,
  amount,
  received,
  payment_date,
}: Income) => {
  await prisma.income.update({
    where: {
      id: id,
    },
    data: {
      source: source,
      description: description,
      amount: amount,
      payment_date: payment_date,
      received: received,
    },
  });
};
