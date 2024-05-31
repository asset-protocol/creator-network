import clsx from "clsx"
import { ReactNode } from "react"

export type AvatarProps = {
  icon: ReactNode,
  className?: string
}
export function Avatar(props: AvatarProps) {
  return (
    <div className="avatar">
      <div className={clsx("w-24 rounded-full", props.className)}>
        {props.icon}
      </div>
    </div>
  )
}