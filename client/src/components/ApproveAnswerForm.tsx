import { useParams } from "react-router-dom";
import {
  useApproveAnswer,
  useGetAnswerByUserIdAndQuestionId,
} from "../api/exam/answer.api";
import { useGetQuestion } from "../api/exam/question.api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const AnswerSchema = yup.object({
  answer: yup.string().required(),
  score: yup.number().required(),
});

type AnswerType = yup.InferType<typeof AnswerSchema>;

function ApproveAnswerForm() {
  const { register, reset, handleSubmit } = useForm<AnswerType>({
    resolver: yupResolver(AnswerSchema),
  });

  const { userId, questionId } = useParams() as {
    userId: string;
    questionId: string;
  };
  const getAnswer = useGetAnswerByUserIdAndQuestionId(userId, questionId);
  const getQuestion = useGetQuestion(questionId);
  const approveAnswer = useApproveAnswer(userId, questionId);

  const { questionSet, questionImageName, questionText } =
    getQuestion.data || {};

  const { status } = getAnswer.data || {};

  useEffect(() => {
    if (getAnswer.isSuccess) reset(getAnswer.data);
  }, [getAnswer.isSuccess]);

  return (
    <form
      className="card"
      onSubmit={handleSubmit((data: AnswerType) => approveAnswer.mutate(data))}
    >
      <div className="card-header text-start">
        <h5>{`PART: ${questionSet}`}</h5>
      </div>
      {questionImageName ? (
        <img
          className="card-img-top"
          src={`/api/file/${questionImageName}`}
        />
      ) : null}
      <div className="card-body">
        <p>{questionText}</p>
        <div>
          <textarea
            className="w-100"
            {...register("answer")}
            disabled
          />
        </div>
        <p>STATUS: {status}</p>
      </div>
      <div className="card-footer">
        <div className="mb-2">
          <input
            {...register("score")}
            type="text"
          />
        </div>
        <button
          className="btn btn-success w-100"
          type="submit"
          disabled={status !== "SUBMITTED"}
        >
          ยืนยันการตรวจสอบ
        </button>
      </div>
    </form>
  );
}

export default ApproveAnswerForm;
