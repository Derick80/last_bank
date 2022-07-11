import type { Bill, User } from '@prisma/client'
import { prisma } from './prisma.server'
import { BillForm, CreateBill } from './types.server'
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
export async function getUserBill(userId: string) {
  const userBills = await prisma.bill.findMany({
    where: { userId: userId },

    orderBy: { due_date: 'desc' }
  })
  return { userBills }
}
export function createBill({
  source,
  description,
  amount,
  due_date,
  paid,
  recurring,
  userId
}: Omit<CreateBill, 'id' & 'userId'> & { userId: User['id'] }) {
  return prisma.bill.create({
    data: {
      source,
      description,
      amount,
      due_date,
      paid,
      recurring,
      userId,
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
