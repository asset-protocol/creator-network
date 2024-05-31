import clsx from "clsx";

export function Divider({ className }: { className?: string }) {
  return <div className={clsx("divider", className)}></div>
}