import { json, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import React from 'react'
import Layout from '~/components/layout'
import { requireUserId } from '~/utils/auth.server'


export const loader: LoaderFunction = async ({ request }) => {
    const { userId, email } = await requireUserId(request)
    return json({ userId })
}
export default function DashboardRoute () {
    const { userId } = useLoaderData()
    console.log("dash", userId);

    return (
        <Layout>

            <Outlet />
        </Layout>
    )
}
