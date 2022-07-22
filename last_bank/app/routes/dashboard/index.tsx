import { User, Bill, Profile, Income } from '@prisma/client'
import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import CardContainer from '~/components/CardContainer'
import { requireUserId, getUser } from '~/utils/auth.server'
import { getMonthlyUserBill } from '~/utils/bill.server'
import { sumTotals } from '~/utils/functions.server'
import { getMonthlyUserIncome } from '~/utils/income.server'
import { IIncome, IBill } from '~/utils/types.server'
import { getAllUserData } from '~/utils/users.server'

type LoaderData = {
    user: User
    userBills: Bill[]
    isBill: boolean
    profile: Profile
    userIncomes: IIncome[]
    totalMonthlyBills: number
    totalMonthlyIncomes: number
    userId: string
    data: Bill | Income
    monthlyUserBills: IBill[]
    monthlyUserIncomes: IIncome[]
}
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const user = await getUser(request)
    const profile = user?.profile
    const { data } = await getAllUserData(userId)

    const { monthlyUserBills } = await getMonthlyUserBill(userId)
    const { monthlyUserIncomes } = await getMonthlyUserIncome(userId)

    const totalMonthlyBills = sumTotals(monthlyUserBills)
    const totalMonthlyIncomes = sumTotals(monthlyUserIncomes)
    return json({
        userId,

        totalMonthlyBills,
        totalMonthlyIncomes,
        user,
        profile,
        data,
        monthlyUserBills,
        monthlyUserIncomes
    })
}
export default function DashBoardIndex () {
    const {
        userId,
        user,
        totalMonthlyIncomes,
        totalMonthlyBills,
        profile,
        monthlyUserBills,
        monthlyUserIncomes
    }: LoaderData = useLoaderData()
    return (<div className="h-full w-full flex flex-row row-span-1 row-start-2 col-span-1 md:gap-5 md: col-start-3 md:col-end-12 md:row-auto">



        <div className="h-full w-4/5 row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-6">
            <CardContainer

                bill={ monthlyUserBills }
                isBill={ true }
                monthlyTotals={ totalMonthlyBills }
                isAll={ false }

            />
        </div>
        <div className="h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-8 md:col-end-12">
            <CardContainer
                income={ monthlyUserIncomes }
                isBill={ false }
                monthlyTotals={ totalMonthlyIncomes }
                isAll={ false }


            /></div>

    </div>)
}
