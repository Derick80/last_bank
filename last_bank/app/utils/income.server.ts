import type { Income } from '@prisma/client'
import { prisma } from './prisma.server'
import { CreateIncome } from './types.server'

export const getUserIncome = async (userId: string) => {
  const userIncomes = await prisma.income.findMany({
    where: { userId: userId },
    orderBy: {
      payment_date: 'asc'
    }
  })
  return { userIncomes }
}
export async function createIncome({
  source,
  description,
  amount,
  payment_date,
  received,
  userId
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
        connect: { id: userId }
      }
    }
  })
}

export async function getOneUserIncome({ params }: any) {
  return prisma.income.findUnique({
    where: { id: params.id }
  })
}
