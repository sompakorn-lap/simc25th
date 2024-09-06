import { refresh, signin, signup } from "@/controllers/auth.controller";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.get("/signin/:signinToken", signin);
authRoute.get("/refresh", refresh);

export default authRoute;
