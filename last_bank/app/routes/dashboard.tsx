import { Bill, Income, Profile, User } from '@prisma/client'
import { json, LoaderFunction } from "@remix-run/node"
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react"
import BillsCard from "~/components/bills-card"
import IncomesCard from "~/components/incomes-card"
import Layout from "~/components/layout"
import CardContainer from '~/components/shared/CardContainer'
import UserPanel from "~/components/user-panel"

import { getUser, requireUserId } from "~/utils/auth.server"
import { getUserBill } from "~/utils/bill.server"
import { numberWithCommas } from "~/utils/format"
import { sumTotals } from "~/utils/functions.server"
import { getUserIncome } from "~/utils/income.server"
import { getAllUserData, getUserProfile } from "~/utils/users.server"
type LoaderData = {
  user: User
  userBills: Bill[]
  isBill: boolean
  profile: Profile
  userIncomes: Income[]
  totalMonthlyBills: number
  totalMonthlyIncomes: number
  userId: string
  data: Bill | Income

}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const user = await getUser(request)
  const profile = user?.profile
  const { data } = await getAllUserData(userId)
  const { userBills } = await getUserBill(userId)
  const { userIncomes } = await getUserIncome(userId)
  const totalMonthlyBills = sumTotals(userBills)

  const totalMonthlyIncomes = sumTotals(userIncomes)
  return json({
    userId,
    userBills,
    userIncomes,
    totalMonthlyBills,
    totalMonthlyIncomes,
    user,
    profile,
    data
  })
}

export default function DashboardRoute () {
  const navigate = useNavigate()

  const { userId, data, userBills, userIncomes, user, totalMonthlyIncomes, totalMonthlyBills, profile }: LoaderData =
    useLoaderData()

  return (
    <Layout>
      <UserPanel profile={ profile } />
      <Outlet />
      <CardContainer bill={ userBills } isBill={ true } monthlyTotals={ totalMonthlyBills } />
      <CardContainer income={ userIncomes } isBill={ false } monthlyTotals={ totalMonthlyIncomes } />
    </Layout>
  )
}


// <div className="h-full w-full col-span-1 md:col-start-8 md:col-end-12">
//   <div className="new-outlet" onClick={ () => navigate(`income/create`) }>
//     Create a New Income
//   </div>
//   <div className="text-2xl font-normal md:text-3xl">Income</div>
//   <p className="font-['Eczar'] font-normal text-3xl underline underline-offset-8 decoration-green-700  md:text-5xl">
//     ${ numberWithCommas(totalMonthlyIncomes) }
//   </p>
//   {/* this is correct */ }

//   <IncomesCard userIncomes={ userIncomes } />
// </div>