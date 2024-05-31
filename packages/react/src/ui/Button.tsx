import clsx from "clsx"
import { ButtonHTMLAttributes, ReactNode } from "react"

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}


export function Button(props: ButtonProps) {
  const { className, children, disabled, loading, ...res } = props;
  return (
    <button className={clsx("btn", props.className)} disabled={loading || disabled} {...res}>
      <span>
        <span className="loading loading-spinner"></span>
        {props.children}
      </span>
    </button>
  )
}
