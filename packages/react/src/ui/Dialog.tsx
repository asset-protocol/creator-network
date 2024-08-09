import clsx from "clsx"
import { ReactNode, useEffect, useRef } from "react"

export type DialogProps = {
  open?: boolean
  title?: string
  children?: ReactNode
  className?: string
  footer?: ReactNode
  onClose?: () => void
}

export function Dialog(props: DialogProps) {
  const dialgoRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open === dialgoRef.current?.open) {
      return;
    }
    if (props.open) {
      dialgoRef.current?.showModal();
    } else {
      dialgoRef.current?.close();
    }
  }, [props.open])

  return (
    <dialog onClose={props.onClose} ref={dialgoRef} className="modal">
      <div className={clsx("modal-box", props.className)}>
        {props.title && <h3 className="font-bold text-lg">{props.title}</h3>}
        {props.children}
        {props.footer && <div className="modal-action">
          {props.footer}
        </div>}
      </div>
    </dialog>
  )
}

export type DialogOkCancelFooterProps = {
  cancleText?: ReactNode
  okText?: ReactNode
  okButtonVisible?: boolean
  onOk?: () => void
}

export function DialogOkCancelFooter(props: DialogOkCancelFooterProps) {
  return <form method="dialog">
    {/* if there is a button in form, it will close the modal */}
    {props.okButtonVisible !== false && <button className="btn" onClick={props.onOk}>{props.okText ?? "Ok"}</button>}
    <button className="btn">{props.cancleText ?? "Cancel"}</button>
  </form>
}