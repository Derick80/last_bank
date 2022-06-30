import React from 'react'
import { Profile, User } from '@prisma/client'
import UserProfile from './user-profile'

export default function UserPanel ({ userProfile }: { userProfile: Profile }) {
    const { id } = userProfile
    return (
        <>
            (
            <UserProfile key={ id } profile={ userProfile } className="h-24 w-24 mx-auto flex-shrink-0" />
            )
        </>
    )
}
