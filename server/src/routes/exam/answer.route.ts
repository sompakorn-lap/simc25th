import { Router } from "express";
import {
  approveAnswerByUserIdAndQuestionId,
  getAnswerByQuestionId,
  getAnswerByUserIdAndQuestionId,
  getSubmittedAnswersByQuestionId,
  submitAnswerByQuestionId,
  updateAnswerByQuestionId,
} from "@/controllers/exam/answer.controller";

const answerRoute = Router();

answerRoute.get("/:questionId", getAnswerByQuestionId);
answerRoute.put("/:questionId", updateAnswerByQuestionId);
answerRoute.put("/submit/:questionId", submitAnswerByQuestionId);
answerRoute.put(
  "/approve/:userId/:questionId",
  approveAnswerByUserIdAndQuestionId
);
answerRoute.get(
  "/submitted_answers/:questionId",
  getSubmittedAnswersByQuestionId
);
answerRoute.get("/:userId/:questionId", getAnswerByUserIdAndQuestionId);

export default answerRoute;
