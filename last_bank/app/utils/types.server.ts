import type { Bill, Income } from "@prisma/client";

export type ICard =
  | {
      data: Bill;
      isBill: true;
    }
  | {
      data: Income;
      isBill: false;
    };

export interface CreateBill {
  source: string;
  due_date: Date;
  description: string;
  amount: number;
  paid: boolean;
  recurring: boolean;
  userId: string;
}
export interface CreateIncome {
  source: string;
  description: string;
  amount: number;
  payment_date: Date;
  received: boolean;
  userId: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
export interface BillForm {
  userId: string;
  source: string;
  due_date: Date;
  description: string;
  amount: number;
  paid: boolean;
  recurring: boolean;
}

export interface IncomeForm {
  id?: string;
  source: string;
  description: string;
  amount: number;
  payment_date: Date;
  received: boolean;
}
