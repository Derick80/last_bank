import { User, Profile, Income, Bill } from '@prisma/client'
import { LoaderFunction, json } from '@remix-run/node'
import { useNavigate, useLoaderData, Outlet } from '@remix-run/react'
import CardContainer from '~/components/CardContainer'
import Layout from '~/components/layout'
import UserPanel from '~/components/user-panel'
import { requireUserId, getUser } from '~/utils/auth.server'
import { getUserBill, getMonthlyUserBill } from '~/utils/bill.server'
import { sumTotals } from '~/utils/functions.server'
import { getUserIncome, getMonthlyUserIncome } from '~/utils/income.server'
import { IBill, IIncome } from '~/utils/types.server'
import { getAllUserData } from '~/utils/users.server'


type LoaderData = {
    user: User
    userBills: IBill[]
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
    const { userBills } = await getUserBill(userId)
    const { userIncomes } = await getUserIncome(userId)

    const { monthlyUserBills } = await getMonthlyUserBill(userId)
    const { monthlyUserIncomes } = await getMonthlyUserIncome(userId)

    const totalMonthlyBills = sumTotals(monthlyUserBills)
    const totalMonthlyIncomes = sumTotals(monthlyUserIncomes)
    return json({
        userId,
        userBills,
        userIncomes,
        totalMonthlyBills,
        totalMonthlyIncomes,
        user,
        profile,
        data,
        monthlyUserBills,
        monthlyUserIncomes
    })
}

export default function Index () {
    const navigate = useNavigate()

    const {
        userId,
        data,
        userBills,
        userIncomes,
        user,
        totalMonthlyIncomes,
        totalMonthlyBills,
        profile,
        monthlyUserBills,
        monthlyUserIncomes
    }: LoaderData = useLoaderData()


    return (
        <Layout>
            <UserPanel profile={ profile } />
            <Outlet />
            <CardContainer income={ userIncomes } isBill={ false } monthlyTotals={ totalMonthlyIncomes } isAll={ true } />
        </Layout>
    )
}
