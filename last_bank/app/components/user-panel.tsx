import React from 'react'
import { Profile, User } from '@prisma/client'
import UserProfile from './user-profile'

export default function UserPanel ({ userProfile }: { userProfile: Profile }) {
    const { id } = userProfile
    return (
        <div className="h-full w-full col-span-1 row-span-1 row-start-3 row-end-3 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 bg-red-600">

            <UserProfile key={ id } profile={ userProfile } className="h-24 w-24 mx-auto flex-shrink-0" />

        </div >
    )
}
