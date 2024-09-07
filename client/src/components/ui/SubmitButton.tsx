type SubmitButtonProps = {
  label: string;
};

function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <div className="mb-2">
      <button
        type="submit"
        className="btn btn-success w-100"
      >
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;
