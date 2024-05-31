import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...res } = props;
  return <textarea className={clsx("textarea textarea-ghost", props.className)} {...res} />
}