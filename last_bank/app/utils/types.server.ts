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
  }
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
