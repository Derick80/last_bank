import { LoaderFunction, json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import IncomesCard from '~/components/incomes-card'
import { requireUserId } from '~/utils/auth.server'
import { getUserIncome } from '~/utils/income.server'
export const loader: LoaderFunction = async ({ request }) => {
    const { userId } = await requireUserId(request)
    const { userIncomes } = await getUserIncome(userId)
    return json({ userIncomes, userId })
}


export default function Index () {
    const { userId, userIncomes } = useLoaderData()
    console.log("userId: ", userId, "userIncomes: ", userIncomes);


    const totalBills: number = userIncomes.reduce(
        (acc: number, curr: any) => (acc += curr.amount),
        0
    )
    return (
        <div className='h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-12'>index bills index route
            <IncomesCard userIncomes={ userIncomes } />
            <Outlet />
        </div>
    )
}
