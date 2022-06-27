import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  const email = 'iderick@gmail.com'

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash('1234567', 10)

  const user = await prisma.user.create({
    data: {
      email,
      firstName: 'Derick',
      lastName: 'Hoskinson',
      password: hashedPassword
    }
  })
  await prisma.income.create({
    data: {
      userId: user.id,
      source: 'Tempus',
      description: 'Paycheck 1',
      payment_date: '2022-07-01T19:00:52Z',
      amount: 2938
    }
  })
  await prisma.income.create({
    data: {
      userId: user.id,
      source: 'Tempus',
      description: 'Paycheck 2',
      payment_date: '2022-07-15T19:00:52Z',
      amount: 2938
    }
  })
  await prisma.income.create({
    data: {
      userId: user.id,
      source: 'Sean',
      description: 'Monthly Rent',
      payment_date: '2022-07-01T19:00:52Z',
      amount: 200
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Mortgage',
      description: 'debit',
      due_date: '2022-07-01T19:00:52Z',
      amount: 1580.79
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Goolge Drive',
      description: 'debit',
      due_date: '2022-07-04T19:00:52Z',
      amount: 10.71
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'car',
      description: 'debit',
      due_date: '2022-07-01T19:00:52Z',
      amount: 588
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'StateFarm',
      description: 'debit',
      due_date: '2022-07-01T19:00:52Z',
      amount: 193
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Credit One Bank 6588',
      description: 'debit',
      due_date: '2022-07-05T19:00:52Z',
      amount: 98
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Google Credit Sync',
      description: 'debit',
      due_date: '2022-07-05T19:00:52Z',
      amount: 103.58
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Dropbox',
      description: 'debit',
      due_date: '2022-07-05T19:00:52Z',
      amount: 13
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'GoogleFi',
      description: 'debit',
      due_date: '2022-07-06T19:00:52Z',
      amount: 76.15
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Bank of America CC (autopay)',
      description: 'debit',
      due_date: '2022-07-09T19:00:52Z',
      amount: 25
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'ComEd',
      description: 'debit',
      due_date: '2022-07-10T19:00:52Z',
      amount: 124
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Ikea Card -commenity-',
      description: 'debit',
      due_date: '2022-07-10T19:00:52Z',
      amount: 46
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Amazon Credit',
      description: 'debit',
      due_date: '2022-07-13T19:00:52Z',
      amount: 127
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'HoA',
      description: 'debit',
      due_date: '2022-07-15T19:00:52Z',
      amount: 428.14
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'New York Times',
      description: 'debit',
      due_date: '2022-07-11T19:00:52Z',
      amount: 28
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Chase (9746) 13.49% IR',
      description: 'debit',
      due_date: '2022-07-15T19:00:52Z',
      amount: 181
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Chase (0127) 21.49% APR',
      description: 'debit',
      due_date: '2022-07-15T19:00:52Z',
      amount: 439
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Chase (7761) 21.49% APR',
      description: 'debit',
      due_date: '2022-07-15T19:00:52Z',
      amount: 54
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Credit one bank 2721',
      description: 'debit',
      due_date: '2022-07-17T19:00:52Z',
      amount: 38
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'AMEX',
      description: 'debit',
      due_date: '2022-07-17T19:00:52Z',
      amount: 223
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'AES',
      description: 'debit',
      due_date: '2022-07-17T19:00:52Z',
      amount: 236.89
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Capital One (auto pay) 16.4% APR',
      description: 'debit',
      due_date: '2022-07-18T19:00:52Z',
      amount: 220
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Navient',
      description: 'debit',
      due_date: '2022-07-18T19:00:52Z',
      amount: 182.37
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'best buy',
      description: 'debit',
      due_date: '2022-07-22T19:00:52Z',
      amount: 50
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'PayPal',
      description: 'debit',
      due_date: '2022-07-24T19:00:52Z',
      amount: 120
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'GreatLakes',
      description: 'debit',
      due_date: '2022-07-26T19:00:52Z',
      amount: 0
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Amazon',
      description: 'debit',
      due_date: '2022-07-27T19:00:52Z',
      amount: 12
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Apple',
      description: 'debit',
      due_date: '2022-07-28T19:00:52Z',
      amount: 104
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Netflix',
      description: 'debit',
      due_date: '2022-07-28T19:00:52Z',
      amount: 20
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Target Red',
      description: 'debit',
      due_date: '2022-07-28T19:00:52Z',
      amount: 70
    }
  })
  await prisma.bill.create({
    data: {
      userId: user.id,
      source: 'Peoples Gas',
      description: 'debit',
      due_date: '2022-07-28T19:00:52Z',
      amount: 75
    }
  })
  console.log('data has been seeded')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
