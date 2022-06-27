import { LoaderFunction, json } from '@remix-run/node'
import React from 'react'
import { requireUserId } from '~/utils/auth.server'
import { getUserIncome } from '~/utils/users.server'
export const loader: LoaderFunction = async ({ request }) => {
    const { userId, email } = await requireUserId(request)
    // const incomes = await getUserIncome(userId, email)

    // return json({ incomes })
}
export default function incomes () {
    return (
        <div>incomes</div>
    )
}
