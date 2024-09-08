import { Router } from "express";
import {
  getAnswerByQuestionId,
  submitAnswerByQuestionId,
  updateAnswerByQuestionId,
} from "@/controllers/exam/answer.controller";

const answerRoute = Router();

answerRoute.get("/:questionId", getAnswerByQuestionId);
answerRoute.put("/:questionId", updateAnswerByQuestionId);
answerRoute.put("/submit/:questionId", submitAnswerByQuestionId);

export default answerRoute;
