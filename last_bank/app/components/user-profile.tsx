import React from "react"
import type { Profile } from "@prisma/client"
interface ProfileProps {
  profile: Profile
  className?: string
  onClick?: (...args: any) => any
}
export default function UserProfile ({
  profile,
  onClick,
  className,
}: ProfileProps) {
  return (
    <div
      className={ `${className} cursor-pointer dark:bg-gray-400 rounded-full flex justify-center items-center` }
      onClick={ onClick }
      style={ {
        backgroundSize: "cover",
        ...(profile.profilePicture
          ? { backgroundImage: profile.profilePicture }
          : {}),
      } }
    >
      { profile && (
        <h2>
          { profile.currentLocation }
          { profile.birthDay }
        </h2>
      ) }
    </div>
  )
}
