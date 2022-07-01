import { json, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import React from 'react'
import Layout from '~/components/layout'
import UserPanel from '~/components/user-panel'
import UserProfile from '~/components/user-panel'
import { getUser, requireUserId } from '~/utils/auth.server'
import { getAllUserData, getUserProfile } from '~/utils/users.server'


export const loader: LoaderFunction = async ({ request }) => {
    const { userId } = await requireUserId(request)
    const userProfile = await getUserProfile(userId)
    return json({ userProfile, userId })
}

export default function DashboardRoute () {
    const { userId, userProfile } = useLoaderData()
    console.log("dash", userId);

    return (
        <Layout>
            <UserPanel userProfile={ userProfile } />
            <Outlet />

        </Layout>
    )
}
