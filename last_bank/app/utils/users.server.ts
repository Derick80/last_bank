import { prisma } from './prisma.server'
import type {
  allData,
  allUserData,
  BillForm,
  IncomeForm,
  RegisterForm
} from './types.server'
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

export const getUserIncome = async (userId: string) => {
  const userIncomes = await prisma.income.findMany({
    where: { userId: userId },
    orderBy: {
      payment_date: 'asc'
    }
  })
  return { userIncomes }
}
export const getUserBill = async (userId: string) => {
  const userBills = await prisma.bill.findMany({
    where: { userId: userId },
    orderBy: {
      due_date: 'asc'
    }
  })
  return { userBills }
}

export const createBill = async (bill: BillForm, userId: string) => {
  const newUserBill = await prisma.bill.create({
    data: {
      source: bill.source,
      amount: bill.amount,
      description: bill.description,
      due_date: bill.due_date,
      paid: bill.paid,
      recurring: bill.recurring,
      user: { connect: { id: userId } }
    }
  })
  return true
}
export const updateBills = async (bill: BillForm, userId: string) => {
  const editedBill = await prisma.bill.update({
    where: { id: bill.id },
    data: {
      source: bill.source,
      amount: bill.amount,
      description: bill.description,
      due_date: bill.due_date,
      paid: bill.paid,
      recurring: bill.recurring,
      user: { connect: { id: userId } }
    }
  })
  return { editedBill }
}
export const createIncomes = async (income: IncomeForm, userId: string) => {
  const newUserIncome = await prisma.income.create({
    data: {
      source: income.source,
      amount: income.amount,
      description: income.description,
      payment_date: income.payment_date,
      received: income.received,
      user: { connect: { id: userId } }
    }
  })
  return true
}
export const updateIncomes = async (income: IncomeForm, userId: string) => {
  const editedIncome = await prisma.income.update({
    where: { id: income.id },
    data: {
      source: income.source,
      amount: income.amount,
      description: income.description,
      payment_date: income.payment_date,
      received: income.received,

      user: { connect: { id: userId } }
    }
  })
  return { editedIncome }
}
