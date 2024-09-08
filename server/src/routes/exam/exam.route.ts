import { Router } from "express";
import answerRoute from "./answer.route";
import questionRoute from "./question.route";
import submissionRoute from "./submission.route";

const examRoute = Router();

examRoute.use("/answer", answerRoute);
examRoute.use("/question", questionRoute);
examRoute.use("/submission", submissionRoute);

export default examRoute;
