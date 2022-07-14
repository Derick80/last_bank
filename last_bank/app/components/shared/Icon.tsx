import React from "react";

export interface IIcon {
  icon_a: string;
  className?: string;
}
export default function Icon({ icon_a, className }: IIcon) {
  return <div className={className}>{icon_a}</div>;
}
