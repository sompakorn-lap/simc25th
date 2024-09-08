import { Router } from "express";
import { getSubmission } from "@/controllers/exam/submission.controller";

const submissionRoute = Router();

submissionRoute.get("/:questionSet", getSubmission);

export default submissionRoute;
