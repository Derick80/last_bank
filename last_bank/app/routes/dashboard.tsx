import { Bill, Income, Profile, User } from "@prisma/client"
import { json, LoaderFunction } from "@remix-run/node"
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react"

import Layout from "~/components/layout"
import CardContainer from "~/components/CardContainer"
import UserPanel from "~/components/user-panel"

import { getUser, requireUserId } from "~/utils/auth.server"
import { getMonthlyUserBill, getUserBill } from "~/utils/bill.server"
import { numberWithCommas } from "~/utils/format"
import { sumTotals } from "~/utils/functions.server"
import { getMonthlyUserIncome, getUserIncome } from "~/utils/income.server"
import { getAllUserData, getUserProfile } from "~/utils/users.server"
import { IBill, IIncome } from '~/utils/types.server'
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

export default function DashboardRoute () {
  const navigate = useNavigate()

  const {
    userId,
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
      <CardContainer
        bill={ monthlyUserBills }
        isBill={ true }
        monthlyTotals={ totalMonthlyBills }
        isAll={ false }

      />
      <CardContainer
        income={ monthlyUserIncomes }
        isBill={ false }
        monthlyTotals={ totalMonthlyIncomes }
        isAll={ false }


      />
    </Layout>
  )
}

