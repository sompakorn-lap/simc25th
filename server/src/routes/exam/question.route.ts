import { Router } from "express";
import {
  createQuestion,
  getQuestionByQuestionId,
} from "@/controllers/exam/question.controller";

const questionRoute = Router();

questionRoute.post("/", createQuestion);
questionRoute.get("/:questionId", getQuestionByQuestionId);

export default questionRoute;
