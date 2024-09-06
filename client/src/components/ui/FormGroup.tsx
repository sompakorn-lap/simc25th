import { ReactNode } from "react";

type FormGroupProps = {
  children: ReactNode;
};

export function FormGroup({ children }: FormGroupProps) {
  return <section className="bg-dark p-2 mb-2 rounded">{children}</section>;
}
