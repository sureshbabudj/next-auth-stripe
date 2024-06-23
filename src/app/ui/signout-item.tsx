"use client";

import { useFormState } from "react-dom";
import { signOutAction } from "../lib/actions";

interface props extends React.HTMLProps<HTMLButtonElement> {}

export function SignOutItem({
  children,
  ...props
}: React.PropsWithChildren<props>) {
  const [errorMessage, dispatch] = useFormState(signOutAction, undefined);
  return (
    <form action={dispatch}>
      <button {...props} type="submit">
        {children}
      </button>
    </form>
  );
}
