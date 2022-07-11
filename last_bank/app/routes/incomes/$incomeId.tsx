import { json, LoaderFunction } from '@remix-run/node'
import React from 'react'
import { getUserId } from '~/utils/auth.server'
import { getOneUserIncome } from '~/utils/income.server'


export const loader: LoaderFunction = async ({ params, request },) => {
    const income = await getOneUserIncome({ params: params })
    const userId = await getUserId(request)
    return json({ userId, income })
}
export default function $incomeId () {
    return (
        <div>$incomeId</div>
    )
}
