import { ComponentProps, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
} & ComponentProps<"form">;

function Form({ children, ...formProps }: FormProps) {
  return (
    <form
      className="p-2"
      {...formProps}
    >
      {children}
    </form>
  );
}

export default Form;
