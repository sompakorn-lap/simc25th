import { Router } from "express";
import authRoute from "./auth.route";
import profileRoute from "./profile.route";
import examRoute from "./exam/exam.route";
import fileRoute from "./file.route";
import documentRoute from "./document.route";
import { getApplicantStatus } from "@/controllers/applicant.controller";
import sponsorRoute from "./sponsor.route";

const apiRoute = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/profile", profileRoute);
apiRoute.use("/file", fileRoute);
apiRoute.use("/exam", examRoute);
apiRoute.use("/document", documentRoute);
apiRoute.get("/applicantStatus", getApplicantStatus);
apiRoute.use("/sponsor", sponsorRoute);

export default apiRoute;
