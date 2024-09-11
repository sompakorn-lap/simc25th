import { useState } from "react";

type SubmitButtonProps = {
  label: string;
  disabled: boolean;
};

function SubmitButton({ label, disabled }: SubmitButtonProps) {
  const [step, setStep] = useState(1);

  if (step === 1)
    return (
      <div className="mb-2">
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={() => setStep(2)}
          disabled={disabled}
        >
          {label}
        </button>
      </div>
    );

  if (step === 2)
    return (
      <div className="mb-2">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <button
              className="btn btn-success w-100"
              type="submit"
            >
              ยืนยัน
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-danger w-100"
              type="button"
              onClick={() => setStep(1)}
            >
              ยกเลิก
            </button>
          </div>
        </div>
        <p className="text-danger">
          เมื่อกดยืนยันแล้วจะไม่สามารถแก้ไข้ข้อมูลได้
        </p>
      </div>
    );
}

export default SubmitButton;
