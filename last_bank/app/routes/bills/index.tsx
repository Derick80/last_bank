import { LoaderFunction, json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import BillsCard from '~/components/bills-card'
import { requireUserId } from '~/utils/auth.server'
import { getUserBill } from '~/utils/bill.server'
export const loader: LoaderFunction = async ({ request }) => {
    const { userId } = await requireUserId(request)
    const { userBills } = await getUserBill(userId)
    return json({ userBills, userId })
}


export default function Index () {
    const { userId, userBills } = useLoaderData()
    console.log("userId: ", userId, "userBills: ", userBills);


    const totalBills: number = userBills.reduce(
        (acc: number, curr: any) => (acc += curr.amount),
        0
    )
    return (
        <div className='h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-12'>index bills index route
            <BillsCard userBills={ userBills } />
            <Outlet />
        </div>
    )
}
