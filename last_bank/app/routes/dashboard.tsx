import { json, LoaderFunction } from "@remix-run/node"
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react"
import { formatISO } from "date-fns"
import React from "react"
import BillsCard from "~/components/bills-card"
import IncomesCard from "~/components/incomes-card"
import Layout from "~/components/layout"
import UserPanel from "~/components/user-panel"

import { getUser, requireUserId } from "~/utils/auth.server"
import { getUserBill } from "~/utils/bill.server"
import { numberWithCommas } from "~/utils/format"
import { sumTotals } from "~/utils/functions.server"
import { getUserIncome } from "~/utils/income.server"
import { getAllUserData, getUserProfile } from "~/utils/users.server"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const user = await getUser(request)
  const { data } = await getAllUserData(userId)
  const { userBills } = await getUserBill(userId)
  const { userIncomes } = await getUserIncome(userId)
  const { profile } = await getUserProfile(userId)
  const realBills = sumTotals(userBills)

  const totalIncomes = sumTotals(userIncomes)
  return json({
    userId,
    userBills,
    userIncomes,
    data,
    totalIncomes,
    realBills,
    profile,
    user,
  })
}

export default function DashboardRoute () {
  const navigate = useNavigate()

  const {
    userId,
    userIncomes,
    data,
    userBills,
    totalIncomes,
    realBills,
    user,
  } = useLoaderData()

  return (
    <Layout>
      <UserPanel profile={ user?.profile } />
      <Outlet />
      <div className="h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-7 md:row-auto">
        <div
          className="transactions-outlet"
          onClick={ () => navigate(`bill/new`) }
        >
          Add a New BIll
        </div>
        <div className="transactions-outlet">
          <Link to="/bills" className="button">
            see all bills
          </Link>

          <Outlet />
        </div>
        <div className="text-2xl font-normal md:text-3xl">Bills</div>
        <p className="font-Eczar font-normal text-3xl underline decoration-red-700 underline-offset-8  md:text-5xl">
          ${ numberWithCommas(realBills) }
        </p>
        {/* this is correct */ }
        <BillsCard userBills={ userBills } />
      </div>
      <div className="h-full w-full col-span-1 md:col-start-8 md:col-end-12">
        <div className="new-outlet" onClick={ () => navigate(`income/create`) }>
          Create a New Income
        </div>
        <div className="text-2xl font-normal md:text-3xl">Income</div>
        <p className="font-['Eczar'] font-normal text-3xl underline underline-offset-8 decoration-green-700  md:text-5xl">
          ${ numberWithCommas(totalIncomes) }
        </p>
        {/* this is correct */ }
        <IncomesCard userIncomes={ userIncomes } />
      </div>
    </Layout>
  )
}
