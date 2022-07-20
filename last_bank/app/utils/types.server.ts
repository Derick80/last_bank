import type { Bill, Income, Tag, User } from "@prisma/client";
export interface IBill extends Bill {
  tags: Tag[];
  incomes: Income;
}

export interface IIncome extends Income {
  tags: Tag[];
}
export type ICard =
  | {
      data: Bill;
      isBill: true;
    }
  | {
      data: Income;
      isBill: false;
    };

export interface CreateOrEditBill {
  source: string;
  accountNumber: number;
  amount: number;
  due_date: Date;
  recurring: boolean;
  paid: boolean;
  description: string;

  userId: string;
}
export interface CreateOrEditIncome {
  source: string;
  accountNumber: number;
  amount: number;
  due_date: Date;
  recurring: boolean;
  paid: boolean;
  description: string;

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
