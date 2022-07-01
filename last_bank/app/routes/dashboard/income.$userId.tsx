// app/routes/home/kudo.$userId.tsx

import { json, LoaderFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import IncomeItems from '~/components/income-card'
import { getUserIncome } from '~/utils/users.server'

// 1
export const loader: LoaderFunction = async ({ request, params }) => {
    // 2
    const { userId } = params
    if (typeof userId !== 'string') {
        return redirect('/dashboard')
    }
    const { userIncomes } = await getUserIncome(userId)
    return json({ userIncomes, userId })
}

export default function IncomeModel () {
    // 3
    const data = useLoaderData()
    return <>

        { data.userIncomes.map((item: any) =>
            <IncomeItems key={ item.id } item={ item }>

            </IncomeItems>
        ) }
    </>
}

