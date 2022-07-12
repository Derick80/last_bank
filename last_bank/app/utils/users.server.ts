import { prisma } from './prisma.server'
import type {
  allData,
  allUserData,
  BillForm,
  IncomeForm,
  RegisterForm
} from './types.server'
import bcrypt from 'bcryptjs'
import { redirect } from '@remix-run/node'

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

export const getAllUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },

    select: {
      id: true,
      email: true,
      bills: true,
      incomes: true,
      profiles: true
    }
  })

  return { data }
}

export const getUserProfile = async (userId: string) => {
  const profile = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  return { profile }
}
