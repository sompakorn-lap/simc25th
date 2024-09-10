import { Router } from "express";
import authRoute from "./auth.route";
import profileRoute from "./profile.route";
import examRoute from "./exam/exam.route";
import fileRoute from "./file.route";
import documentRoute from "./document.route";

const apiRoute = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/profile", profileRoute);
apiRoute.use("/file", fileRoute);
apiRoute.use("/exam", examRoute);
apiRoute.use("/document", documentRoute);

export default apiRoute;
