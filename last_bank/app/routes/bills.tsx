import { LoaderFunction, json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import React from 'react'
import { requireUserId } from '~/utils/auth.server'
import { getUserBill } from '~/utils/users.server'

export default function BillsRoute () {
    return (
        <div>
            <Outlet />
        </div>
    )
}
