import { ComponentProps, ReactNode } from "react";
import { Control, useFormState } from "react-hook-form";

type SelectProps = {
  control: Control<any>;
  name: string;
  label: string;
  disabled: boolean;
  children: ReactNode;
} & ComponentProps<"select">;

function Select({ control, name, label, disabled, children }: SelectProps) {
  const { errors } = useFormState<Record<string, unknown>>({ control });

  return (
    <div className="mb-2">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        {...control.register(name)}
        disabled={disabled}
      >
        {children}
      </select>
      <span>{errors[name]?.message}</span>
    </div>
  );
}

export default Select;
