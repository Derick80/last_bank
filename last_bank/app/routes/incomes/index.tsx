import { LoaderFunction, json } from '@remix-run/node'
import React from 'react'
import { requireUserId } from '~/utils/auth.server'
import { getUserIncome } from '~/utils/users.server'
export const loader: LoaderFunction = async ({ request }) => {
    const { userId } = await requireUserId(request)
    const { userIncomes } = await getUserIncome(userId)
    return json({ userIncomes, userId })
}
export default function index () {
    return (
        <div>index</div>
    )
}
