import { LoaderFunction, json } from '@remix-run/node'
import React from 'react'
import { requireUserId } from '~/utils/auth.server'
import { getUserBill } from '~/utils/users.server'
export const loader: LoaderFunction = async ({ request }) => {
    const { userId, email } = await requireUserId(request)
    const incomes = await getUserBill(userId, email)

    return json({ incomes })
}
export default function bills () {
    return (
        <div>bills</div>
    )
}
