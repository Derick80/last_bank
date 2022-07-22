import { LoaderFunction, json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import BillsCard from "archive/bills-card"
import GlobalCard from "archive/test-card"
import CardBase from "~/components/CardBase"
import CardContainer from '~/components/CardContainer'
import Layout from '~/components/layout'
import UserPanel from '~/components/user-panel'
import { requireUserId } from "~/utils/auth.server"
import { getUserBill } from "~/utils/bill.server"


export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const { userBills } = await getUserBill(userId)
  return json({ userBills, userId })
}

export default function Index () {
  const { userId, userBills } = useLoaderData()
  console.log("userId: ", userId, "userBills: ", userBills)

  return (
    <Layout>
      <UserPanel profile={ profile } />
      <CardContainer
        bill={ monthlyUserBills }
        isBill={ true }
        monthlyTotals={ totalMonthlyBills }
      />
      <CardContainer
        income={ monthlyUserIncomes }
        isBill={ false }
        monthlyTotals={ totalMonthlyIncomes }
      />
    </Layout>
  )
}
