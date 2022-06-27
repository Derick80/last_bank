import { prisma } from './prisma.server'
import type { allData, allUserData, RegisterForm } from './types.server'
import bcrypt from 'bcryptjs'

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: passwordHash
    }
  })
  return { id: newUser.id, email: user.email }
}

export const getAllUserData = async (userId: string, email: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },

    select: {
      id: true,
      email: true,
      bills: true,
      incomes: true
    }
  })

  return { data }
}

export const getUserIncome = async (userId: string, email: string) => {
  const incomes = await prisma.income.findMany({
    where: { userId: userId },
    orderBy: {
      payment_date: 'asc'
    }
  })
  return { incomes }
}
export const getUserBill = async (userId: string, email: string) => {
  const userBills = await prisma.bill.findMany({
    where: { userId: userId },
    orderBy: {
      due_date: 'asc'
    }
  })
  return { userBills }
}
