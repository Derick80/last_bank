import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "iderick@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("1234567", 10);

  const user = await prisma.user.create({
    data: {
      email,
      firstName: "Derick",
      lastName: "Hoskinson",
      password: hashedPassword,
    },
  });
  await prisma.profile.create({
    data: {
      userId: user.id,
      currentLocation: "chicago",
      birthDay: "1980-03-03T19:00:52Z",
      occupation: "scientist",
      preferredPronoun: "He/Him",
    },
  });

  await prisma.income.create({
    data: {
      userId: user.id,
      source: "Tempus",
      description: "Paycheck 1",
      payment_date: "2022-08-01T19:00:52Z",
      amount: 2938,
      accountNumber: 1234,
      category: "Paycheck",
    },
  });
  await prisma.income.create({
    data: {
      userId: user.id,
      source: "Tempus",
      description: "Paycheck 2",
      payment_date: "2022-08-15T19:00:52Z",
      amount: 2938,
      category: "Paycheck",
      accountNumber: 1234,
    },
  });
  await prisma.income.create({
    data: {
      userId: user.id,
      source: "Sean",
      description: "Monthly Rent",
      payment_date: "2022-08-01T19:00:52Z",
      amount: 200,
      category: "Other",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Mortgage",
      description: "debit",
      due_date: "2022-08-01T19:00:52Z",
      amount: 1580.79,
      category: "Mortage",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Goolge Drive",
      description: "debit",
      due_date: "2022-08-04T19:00:52Z",
      amount: 10.71,
      category: "Subscription",
      tags: "NEED",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "car",
      description: "debit",
      due_date: "2022-08-01T19:00:52Z",
      amount: 588,
      category: "Car",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "StateFarm",
      description: "debit",
      due_date: "2022-08-01T19:00:52Z",
      amount: 193,
      category: "Car",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Credit One Bank 6588",
      description: "debit",
      due_date: "2022-08-05T19:00:52Z",
      amount: 98,
      category: "Credit Card",
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Google Credit Sync",
      description: "debit",
      due_date: "2022-08-05T19:00:52Z",
      amount: 103.58,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Dropbox",
      description: "debit",
      due_date: "2022-08-05T19:00:52Z",
      amount: 13,
      category: "Subscription",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "GoogleFi",
      description: "debit",
      due_date: "2022-08-06T19:00:52Z",
      amount: 76.15,

      category: "Subscription",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Bank of America CC (autopay)",
      description: "debit",
      due_date: "2022-08-09T19:00:52Z",
      amount: 25,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "ComEd",
      description: "debit",
      due_date: "2022-08-10T19:00:52Z",
      amount: 124,

      category: "Utilities",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Ikea Card -commenity-",
      description: "debit",
      due_date: "2022-08-10T19:00:52Z",
      amount: 46,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Amazon Credit",
      description: "debit",
      due_date: "2022-08-13T19:00:52Z",
      amount: 127,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "HoA",
      description: "debit",
      due_date: "2022-08-15T19:00:52Z",
      amount: 428.14,

      category: "Condo",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "New York Times",
      description: "debit",
      due_date: "2022-08-11T19:00:52Z",
      amount: 28,
      category: "Subscription",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Chase (9746) 13.49% IR",
      description: "debit",
      due_date: "2022-08-15T19:00:52Z",
      amount: 181,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Chase (0127) 21.49% APR",
      description: "debit",
      due_date: "2022-08-15T19:00:52Z",
      amount: 439,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Chase (7761) 21.49% APR",
      description: "debit",
      due_date: "2022-08-15T19:00:52Z",
      amount: 54,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Credit one bank 2721",
      description: "debit",
      due_date: "2022-08-17T19:00:52Z",
      amount: 38,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "AMEX",
      description: "debit",
      due_date: "2022-08-17T19:00:52Z",
      amount: 223,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "AES",
      description: "debit",
      due_date: "2022-08-17T19:00:52Z",
      amount: 236.89,

      category: "Student Loan",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Capital One (auto pay) 16.4% APR",
      description: "debit",
      due_date: "2022-08-18T19:00:52Z",
      amount: 220,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Navient",
      description: "debit",
      due_date: "2022-08-18T19:00:52Z",
      amount: 182.37,
      category: "Student Loan",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "best buy",
      description: "debit",
      due_date: "2022-08-22T19:00:52Z",
      amount: 50,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "PayPal",
      description: "debit",
      due_date: "2022-08-24T19:00:52Z",
      amount: 120,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "GreatLakes",
      description: "debit",
      due_date: "2022-08-26T19:00:52Z",
      amount: 0,
      category: "Student Loan",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Amazon",
      description: "debit",
      due_date: "2022-08-27T19:00:52Z",
      amount: 12,

      category: "Subscription",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Apple",
      description: "debit",
      due_date: "2022-08-28T19:00:52Z",
      amount: 104,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Netflix",
      description: "debit",
      due_date: "2022-08-28T19:00:52Z",
      amount: 20,

      category: "Subscription",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Target Red",
      description: "debit",
      due_date: "2022-08-28T19:00:52Z",
      amount: 70,
      category: "Credit Card",
      accountNumber: 1234,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Peoples Gas",
      description: "debit",
      due_date: "2022-08-28T19:00:52Z",
      amount: 75,
      category: "Utilities",
      accountNumber: 1234,
    },
  });
  console.log("data has been seeded");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
