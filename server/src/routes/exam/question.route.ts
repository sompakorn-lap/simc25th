import { Router } from "express";
import {
  createQuestion,
  getQuestionByQuestionId,
  getQuestions,
} from "@/controllers/exam/question.controller";

const questionRoute = Router();

questionRoute.post("/", createQuestion);
questionRoute.get("/list", getQuestions);
questionRoute.get("/:questionId", getQuestionByQuestionId);

export default questionRoute;
