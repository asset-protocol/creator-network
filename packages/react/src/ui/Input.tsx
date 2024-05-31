import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";

export type NumberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  before?: ReactNode
  after?: ReactNode
}
export function NumberInput(props: NumberInputProps) {
  const { before, after, className, ...res } = props;
  return <label className={clsx("input input-bordered flex items-center gap-2", className)}>
    {before}
    <input type="number" className="grow" {...res} />
    {after}
  </label>
}