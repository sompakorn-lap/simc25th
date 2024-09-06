type SubmitButtonProps = {
  label: string;
};

function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="btn btn-success w-100"
    >
      {label}
    </button>
  );
}

export default SubmitButton;
