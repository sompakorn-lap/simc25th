import { useEffect } from "react";
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
import { useParams } from "react-router-dom";

const AnswerSchema = yup.object({ answer: yup.string().required() });
type AnswerType = yup.InferType<typeof AnswerSchema>;

const questionSetTH: Record<string, string> = {
  IQ: "เชาวน์ปัญญา",
  ETHICS: "จริยธรรม",
  SIRIRAJ: "ศิริราช",
  KNOWLEGDE: "ความรู้ทางการแพทย์",
  CREATIVE: "สร้างสรรค์",
};

function ExamEditor() {
  const { control, reset, handleSubmit, watch } = useForm<AnswerType>({
    resolver: yupResolver(AnswerSchema),
  });

  const { questionSet } = useParams() as { questionSet: string };

  const getSubmission = useGetSubmission(questionSet);
  const { questionIds = [], currentIndex = 0 } = getSubmission.data || {};
  const questionId = questionIds[currentIndex];
  const questionTitle = `PART: ${questionSetTH[questionSet]} (${
    currentIndex + 1
  }/${questionIds.length})`;

  const getQuestion = useGetQuestion(questionId);
  const { questionText = "", questionImageName = "" } = getQuestion.data || {};

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

  if (currentIndex >= questionIds.length) return <h1>FINISH</h1>;
  return (
    <form
      className="card"
      onSubmit={handleSubmit((data: AnswerType) => submitAnswer.mutate(data))}
    >
      {questionImageName ? (
        <img
          className="card-img-top"
          src={`/api/file/${questionImageName}`}
        />
      ) : null}
      <div className="card-body">
        <h5 className="card-title">{questionTitle}</h5>
        <p>{questionText}</p>
        <div>
          <input {...control.register("answer")} />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitAnswer.isPending}
        >
          ข้อถัดไป
        </button>
      </div>
    </form>
  );
}

export default ExamEditor;
