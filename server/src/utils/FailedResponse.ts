import { NextFunction, Request, Response } from "express";

class FailedResponse extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "FailedResponse";
  }
}

export default FailedResponse;

export function FailedResponseHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof FailedResponse) {
    const { status, message } = err;
    res.status(status).send(message);
  } else {
    console.error(err);
    res.status(500).send();
  }
}
