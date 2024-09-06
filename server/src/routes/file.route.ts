import { viewFile } from "@/libs/google/ggdrive";
import { Router } from "express";

const fileRoute = Router();

fileRoute.get("/:fileName", viewFile);

export default fileRoute;
