import { FormHTMLAttributes } from "react"

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {

}
export function Form(props: FormProps) {
  const { ...res } = props;
  return <form {...res}  />
}