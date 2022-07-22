import type { Bill, User } from "@prisma/client";
import { logout } from "./auth.server";
import { dateRange, formatDate } from "./functions.server";
import { prisma } from "./prisma.server";
import { BillForm, CreateBill } from "./types.server";
export type { Bill } from "@prisma/client";

export function getOneUserBIll({
  id,
  userId,
}: Pick<Bill, "id"> & {
  userId: User["id"];
}) {
  return prisma.bill.findFirst({
    where: { id, userId },
    include: { tags: true },
  });
}

export async function updateOneUserBill({
  id,
  userId,
  source,
  accountNumber,
  amount,
  due_date,
  recurring,
  paid,
  description,
}: Omit<Bill, "createdAt" | "updatedAt">) {
  await prisma.bill.update({
    where: { id: id },
    data: {
      source: source,
      accountNumber: accountNumber,
      amount: amount,
      due_date: due_date,
      recurring: recurring,
      paid: paid,
      description: description,
    },
  });
}
export async function getUserBill(userId: string) {
  const userBills = await prisma.bill.findMany({
    where: { userId: userId },

    orderBy: { due_date: "asc" },
    include: { tags: true },
  });
  return { userBills };
}
export function createBill({
  source,
  accountNumber,
  amount,
  due_date,
  recurring,
  paid,
  description,
  userId,
}: Omit<CreateBill, "id" & "userId"> & { userId: User["id"] }) {
  return prisma.bill.create({
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
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteBill({
  id,
  userId,
}: Pick<Bill, "userId" | "id"> & { userId: User["id"] }) {
  return prisma.bill.deleteMany({
    where: { id, userId },
  });
}

export async function getMonthlyUserBill(userId: string) {
  const { now, then } = dateRange();
  const monthlyUserBills = await prisma.bill.findMany({
    where: {
      userId: userId,
      due_date: {
        gte: now.toISOString(),
        lte: then.toISOString(),
      },
    },
    orderBy: { due_date: "asc" },
    include: { tags: true },
  });
  return { monthlyUserBills };
}
