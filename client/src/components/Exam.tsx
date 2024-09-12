import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetQuestion } from "../api/exam/question.api";
import {
  useGetAnswer,
  useSubmitAnswer,
  useUpdateAnswer,
} from "../api/exam/answer.api";
import useFormDebounceCallback from "../hooks/useFormDebounceCallback";
import { useGetSubmission } from "../api/exam/submission.api";
import { Link, useParams } from "react-router-dom";

const AnswerSchema = yup.object({ answer: yup.string().required() });
type AnswerType = yup.InferType<typeof AnswerSchema>;

const questionSetTH: Record<string, string> = {
  IQ: "เชาวน์ปัญญา",
  ETHICS: "จริยธรรม",
  SIRIRAJ: "ศิริราช",
  KNOWLEDGE: "ความรู้ทางการแพทย์",
  CREATIVE: "สร้างสรรค์",
};

function Exam() {
  const { register, reset, handleSubmit, watch } = useForm<AnswerType>({
    resolver: yupResolver(AnswerSchema),
  });

  const { questionSet } = useParams() as { questionSet: string };

  const getSubmission = useGetSubmission(questionSet);
  const { questionIds = [], currentIndex = 0 } = getSubmission.data || {};
  const questionId = questionIds[currentIndex];

  const getQuestion = useGetQuestion(questionId);
  const {
    questionText = "",
    questionImageName = "",
    questionType = "",
    choices = [],
  } = getQuestion.data || {};

  const submitAnswer = useSubmitAnswer(questionSet, questionId);
  const updateAnswer = useUpdateAnswer(questionId);
  const { isSuccess, data: answer } = useGetAnswer(questionId);

  useEffect(() => {
    if (isSuccess) reset(answer);
  }, [isSuccess]);

  useFormDebounceCallback(
    (data: Partial<AnswerType>) => updateAnswer.mutate(data),
    watch,
    500
  );

  if (currentIndex >= questionIds.length)
    return (
      <div className="card">
        <div className="card-header text-start">
          <h5>{`PART: ${questionSetTH[questionSet]}`}</h5>
        </div>
        <div className="card-body">
          <p>น้องทำข้อสอบ part นี้เสร็จเรียบร้อยแล้ว</p>
        </div>
        <div className="card-footer">
          <Link
            className="btn btn-primary w-100"
            to="/dashboard"
          >
            กลับไปยังหน้า dashboard
          </Link>
        </div>
      </div>
    );
  return (
    <form
      className="card bg-light text-dark fs-5"
      data-bs-theme="light"
      onSubmit={handleSubmit((data: AnswerType) => submitAnswer.mutate(data))}
    >
      <div className="card-header text-start">
        <h4>{`PART: ${questionSetTH[questionSet]} (${currentIndex + 1}/${
          questionIds.length
        })`}</h4>
      </div>
      {questionImageName ? (
        <img
          className="card-img-top"
          src={`/api/file/${questionImageName}`}
        />
      ) : null}
      <div className="card-body">
        <div className="mb-2">
          {questionText.split(" \\n ").map((text: string) => (
            <p className="m-0">{text}</p>
          ))}
        </div>
        {questionType === "MCQ" ? (
          <ExamMCQ
            register={register}
            choices={choices}
          />
        ) : null}
        {questionType === "SHORT_ANSWER" ? (
          <ExamShortAnswer register={register} />
        ) : null}
        {questionType === "LONG_ANSWER" ? (
          <ExamLongAnswer register={register} />
        ) : null}
      </div>
      <div className="card-footer">
        <button
          className="btn btn-success w-100"
          type="submit"
          disabled={submitAnswer.isPending}
        >
          {currentIndex < questionIds.length - 1
            ? "ข้อถัดไป"
            : "ข้อสุดท้ายแล้ว"}
        </button>
      </div>
    </form>
  );
}

function ExamMCQ({
  register,
  choices,
}: {
  register: any;
  choices: Array<{ text: string }>;
}) {
  const id = useId();

  return (
    <div className="form-check bg-light text-dark">
      {choices.map(({ text }, index) => (
        <div key={`${id}-${index}`}>
          <input
            className="form-check-input"
            {...register("answer")}
            type="radio"
            id={`${id}-${index}`}
            value={text}
          />
          <label
            className="form-check-label"
            htmlFor={`${id}-${index}`}
          >
            {text}
          </label>
        </div>
      ))}
    </div>
  );
}

function ExamShortAnswer({ register }: { register: any }) {
  return (
    <input
      className="form-control bg-light text-dark"
      {...register("answer")}
    />
  );
}

function ExamLongAnswer({ register }: { register: any }) {
  return (
    <textarea
      className="form-control bg-light text-dark"
      {...register("answer")}
    />
  );
}

export default Exam;
