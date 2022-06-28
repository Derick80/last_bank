// app/routes/home/kudo.$userId.tsx

import { json, LoaderFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserBill } from '~/utils/users.server'

// 1
export const loader: LoaderFunction = async ({ request, params }) => {
    // 2
    const { userId } = params
    if (typeof userId !== 'string') {
        return redirect('/dashboard')
    }
    const { userBills } = await getUserBill(userId)
    return json({ userBills, userId })
}

export default function KudoModal () {
    // 3
    const { userBills, userId } = useLoaderData()
    return <h2> User: { userId } </h2>
}