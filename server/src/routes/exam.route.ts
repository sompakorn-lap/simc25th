import {
  getAnswerByQuestionId,
  submitAnswerByQuestionId,
  updateAnswerByQuestionId,
} from "@/controllers/exam/answer.controller";
import {
  createQuestion,
  getQuestionByQuestionId,
} from "@/controllers/exam/question.controller";
import { getSubmission } from "@/controllers/exam/submission.controller";
import { Router } from "express";

const examRoute = Router();

examRoute.get("/submission/:questionSet", getSubmission);
examRoute.get("/answer/:questionId", getAnswerByQuestionId);
examRoute.put("/answer/:questionId", updateAnswerByQuestionId);
examRoute.put("/answer/submit/:questionId", submitAnswerByQuestionId);
examRoute.post("/question", createQuestion);
examRoute.get("/question/:questionId", getQuestionByQuestionId);

export default examRoute;
