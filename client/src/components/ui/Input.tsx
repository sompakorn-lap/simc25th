import { ComponentProps } from "react";
import { Control, useFormState } from "react-hook-form";

type InputProps = {
  control: Control<any>;
  name: string;
  label: string;
  disabled: boolean;
} & ComponentProps<"input">;

function Input({ control, name, label, disabled, ...inputProps }: InputProps) {
  const { errors } = useFormState<Record<string, unknown>>({ control });

  return (
    <div className="mb-2">
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        {...control.register(name)}
        {...inputProps}
        disabled={disabled}
      />
      <span className="text-danger">{errors[name]?.message}</span>
    </div>
  );
}

export default Input;
