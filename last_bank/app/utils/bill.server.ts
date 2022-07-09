import type { Bill, User } from '@prisma/client'
import { prisma } from './prisma.server'
import { BillForm } from './types.server'
export type { Bill } from '@prisma/client'

export function getOneBill({
  id,
  userId
}: Pick<Bill, 'id'> & {
  userId: User['id']
}) {
  return prisma.bill.findFirst({
    where: { id, userId }
  })
}
export async function getUserBill({ userId }: { userId: User['id'] }) {
  const bills = await prisma.bill.findMany({
    where: { userId },

    orderBy: { due_date: 'desc' }
  })
  return bills
}
export function createBill({
  source,
  description,
  amount,
  due_date,
  paid,
  recurring,
  userId
}: Pick<
  Bill,
  | 'source'
  | 'description'
  | 'amount'
  | 'due_date'
  | 'paid'
  | 'recurring'
  | 'userId'
> & {
  userId: User['id']
}) {
  return prisma.bill.create({
    data: {
      source,
      description,
      amount,
      due_date,
      paid,
      recurring,
      userId: userId,
      user: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export function deleteBill({
  id,
  userId
}: Pick<Bill, 'userId' | 'id'> & { userId: User['id'] }) {
  return prisma.bill.deleteMany({
    where: { id, userId }
  })
}
