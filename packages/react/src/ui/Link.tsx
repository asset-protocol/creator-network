import clsx from "clsx";
import { AnchorHTMLAttributes, ReactNode } from "react";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link({ className, children, ...resProps }: LinkProps) {
  return <a href="" className={clsx("link link-primary", className)} {...resProps}>{children}</a>
}