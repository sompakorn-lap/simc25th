import { Router } from "express";
import authRoute from "./auth.route";
import profileRoute from "./profile.route";
import examRoute from "./exam.route";

const apiRoute = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/profile", profileRoute);

apiRoute.use("/exam", examRoute);

export default apiRoute;
