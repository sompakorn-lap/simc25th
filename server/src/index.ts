import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import apiRoute from "@/routes/api.route";
import { FailedResponseHandler } from "@/utils/FailedResponse";

const app: Express = express();
app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(cookieParser());

app.use("/api", apiRoute);
app.use(express.static(path.resolve("../client/build")));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve("../client/build/index.html"));
});
app.use(FailedResponseHandler);

const port: number = parseInt(process.env.PORT as string) || 3000;
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
