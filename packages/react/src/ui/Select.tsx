import clsx from "clsx"
import { OptionHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react"

export type OptionItem = Omit<OptionHTMLAttributes<HTMLOptionElement>, "children"> & {
  label: ReactNode
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: OptionItem[]
}

export function Select(props: SelectProps) {
  const { className, ...res } = props;
  return <select className={clsx("select select-bordered w-full max-w-xs", className)} {...res}>
    {props.options?.map(op => (<option>{op.label}</option>))}
  </select >
}