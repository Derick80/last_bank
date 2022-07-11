export interface allUserData {
  allUserData: Array<{
    id: string
    email: string
    firstName: string
    lastName: string
    password: string
    bills: {
      id: string
      source: string
      due_date: Date
      description: string
      amount: number
      paid: boolean
      recurring: boolean
    }
    incomes: {
      id: string
      source: string
      description: string
      amount: number
      payment_date: Date
      received: boolean
    }
  }>
}

export interface allData {
  allData: Array<{
    id: string
    email: string

    bills: {
      id: string
      source: string
      due_date: Date
      description: string
      amount: number
      paid: boolean
      recurring: boolean
    }
    incomes: {
      id: string
      source: string
      description: string
      amount: number
      payment_date: Date
      received: boolean
    }
  }>[]
}
export interface Bills {
  bills: {
    id: string
    source: string
    due_date: Date
    description: string
    amount: number
    paid: boolean
    recurring: boolean
    userId: string
  }
}
export interface CreateBill {
  source: string
  due_date: Date
  description: string
  amount: number
  paid: boolean
  recurring: boolean
  userId: string
}
export interface CreateIncome {
  source: string
  description: string
  amount: number
  payment_date: Date
  received: boolean
  userId: string
}
export interface Income {
  incomes: {
    id: string
    source: string
    description: string
    amount: number
    payment_date: Date
    received: boolean
  }
}
export interface RegisterForm {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginForm {
  email: string
  password: string
}
export interface BillForm {
  userId: string
  source: string
  due_date: Date
  description: string
  amount: number
  paid: boolean
  recurring: boolean
}

export interface IncomeForm {
  id?: string
  source: string
  description: string
  amount: number
  payment_date: Date
  received: boolean
}

export type Ibills2 = {
  children?:
    | React.ReactNode[]
    | React.ReactElement[]
    | JSX.Element[]
    | JSX.Element
    | React.ReactChild
    | React.ReactChild[]
  id: string
  source: string
  due_date: Date
  description: string
  amount: number
  paid: boolean
  recurring: boolean
}

export interface IAction {}
export type Action =
  | { type: 'createBills'; value: string }
  | { type: 'updateBills'; value: string }
  | { type: 'createIncomes'; value: string }
  | { type: 'updateIncomes'; value: string }
