import React from "react"

export interface IIcon {
  icon: string
  className?: string
}
export default function Icon ({ icon, className }: IIcon) {
  return <div className={ className }>{ icon }</div>
}
