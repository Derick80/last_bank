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
      accountNumber: 1234,
      description: "Paycheck 1",
      due_date: "2022-07-01T19:00:52Z",
      amount: 2938,
    },
  });
  await prisma.income.create({
    data: {
      userId: user.id,
      source: "Tempus",
      accountNumber: 1234,

      description: "Paycheck 2",
      due_date: "2022-07-15T19:00:52Z",
      amount: 2938,
    },
  });
  await prisma.income.create({
    data: {
      userId: user.id,
      source: "Sean",
      accountNumber: 1234,

      description: "Monthly Rent",
      due_date: "2022-07-01T19:00:52Z",
      amount: 200,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Mortgage",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-01T19:00:52Z",
      amount: 1580.79,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Goolge Drive",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-04T19:00:52Z",
      amount: 10.71,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "car",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-01T19:00:52Z",
      amount: 588,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "StateFarm",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-01T19:00:52Z",
      amount: 193,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Credit One Bank 6588",
      accountNumber: 6588,

      description: "debit",
      due_date: "2022-07-05T19:00:52Z",
      amount: 98,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Google Credit Sync",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-05T19:00:52Z",
      amount: 103.58,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Dropbox",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-05T19:00:52Z",
      amount: 13,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "GoogleFi",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-06T19:00:52Z",
      amount: 76.15,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Bank of America CC (autopay)",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-09T19:00:52Z",
      amount: 25,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "ComEd",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-10T19:00:52Z",
      amount: 124,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Ikea Card -commenity-",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-10T19:00:52Z",
      amount: 46,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Amazon Credit",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-13T19:00:52Z",
      amount: 127,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "HoA",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-15T19:00:52Z",
      amount: 428.14,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "New York Times",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-11T19:00:52Z",
      amount: 28,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Chase (9746) 13.49% IR",
      accountNumber: 9746,

      description: "debit",
      due_date: "2022-07-15T19:00:52Z",
      amount: 181,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Chase (0127) 21.49% APR",
      accountNumber: 0o127,
      description: "debit",
      due_date: "2022-07-15T19:00:52Z",
      amount: 439,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Chase (7761) 21.49% APR",
      accountNumber: 7761,

      description: "debit",
      due_date: "2022-07-15T19:00:52Z",
      amount: 54,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Credit one bank 2721",
      accountNumber: 2721,

      description: "debit",
      due_date: "2022-07-17T19:00:52Z",
      amount: 38,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "AMEX",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-17T19:00:52Z",
      amount: 223,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "AES",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-17T19:00:52Z",
      amount: 236.89,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Capital One (auto pay) 16.4% APR",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-18T19:00:52Z",
      amount: 220,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Navient",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-18T19:00:52Z",
      amount: 182.37,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "best buy",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-22T19:00:52Z",
      amount: 50,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "PayPal",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-24T19:00:52Z",
      amount: 120,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "GreatLakes",
      accountNumber: 1234,
      description: "debit",
      due_date: "2022-07-26T19:00:52Z",
      amount: 0,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Amazon",
      description: "debit",
      due_date: "2022-07-27T19:00:52Z",
      amount: 12,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Apple",
      description: "debit",
      due_date: "2022-07-28T19:00:52Z",
      amount: 104,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Netflix",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-28T19:00:52Z",
      amount: 20,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Target Red",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-28T19:00:52Z",
      amount: 70,
    },
  });
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: "Peoples Gas",
      accountNumber: 1234,

      description: "debit",
      due_date: "2022-07-28T19:00:52Z",
      amount: 75,
    },
  });
  await prisma.account.create({
    data: {
      userId: user.id,
      source: "Checking Account",
      accountNumber: 1234,
      amount: 2760,
      accountType: "Checking Account",
      description: "Checking Account",
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
