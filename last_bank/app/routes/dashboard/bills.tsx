import { User, Profile, Income } from '@prisma/client'
import { LoaderFunction, json } from "@remix-run/node"
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react"
import BillsCard from "archive/bills-card"
import GlobalCard from "archive/test-card"
import CardBase from "~/components/CardBase"
import CardContainer from '~/components/CardContainer'
import CardIncome from '~/components/CardIncome'
import Layout from '~/components/layout'
import UserPanel from '~/components/user-panel'
import { getUser, requireUserId } from "~/utils/auth.server"
import { Bill, getMonthlyUserBill, getUserBill } from "~/utils/bill.server"
import { sumTotals } from '~/utils/functions.server'
import { getUserIncome, getMonthlyUserIncome } from '~/utils/income.server'
import { IBill, IIncome } from '~/utils/types.server'
import { getAllUserData } from '~/utils/users.server'

type Props = {
    userData: IIncome[] | IBill[]
}
type LoaderData = {
    user: User
    userBills: IBill[]
    isBill: boolean
    profile: Profile
    userIncomes: Income[]
    totalMonthlyBills: number
    totalMonthlyIncomes: number
    userId: string
    data: Bill | Income
    monthlyUserBills: IBill[]
    monthlyUserIncomes: IIncome[]
    userData: IIncome[] | IBill[]
}
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const user = await getUser(request)
    const profile = user?.profile

    const { userBills } = await getUserBill(userId)


    const { monthlyUserBills } = await getMonthlyUserBill(userId)


    const totalMonthlyBills = sumTotals(monthlyUserBills)

    return json({
        userId,
        userBills,

        totalMonthlyBills,

        user,
        profile,

        monthlyUserBills,

    })
}

export default function Index ({ userData }: Props) {
    const navigate = useNavigate()

    const {
        userId,

        userBills,

        user,

        totalMonthlyBills,
        profile,
        monthlyUserBills,

    }: LoaderData = useLoaderData()


    return (
        <Layout>

            { userBills && (
                <div className="h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-11 md:row-auto"> { userBills.map((item) => (
                    <div
                        className="flex flex-col items-center text-center text-base w-full dark:bg-zinc-700 md:max-w-screen-xl rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 mb-2 mt-2 py-2 md:text-lg"
                        key={ item.id }
                    >
                        <CardIncome item={ item } isBill={ true } isAll={ true } />
                    </div>
                )) }</div>
            ) }
        </Layout>
    )
}
