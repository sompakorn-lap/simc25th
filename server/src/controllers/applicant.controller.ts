import { useAccessToken } from "@/libs/crypto/token";
import prisma from "@/libs/prisma/prisma";
import { QuestionSet } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export async function getApplicantStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const questionSets = [
      "IQ",
      "ETHICS",
      "KNOWLEDGE",
      "SIRIRAJ",
      "CREATIVE",
    ] as QuestionSet[];
    const { userId } = await useAccessToken(req);
    const questions = await Promise.all(
      questionSets.map((questionSet) =>
        prisma.question.findMany({ where: { questionSet } })
      )
    );
    const answers = await Promise.all(
      questionSets.map((questionSet) =>
        prisma.answer.findMany({ where: { userId, questionSet } })
      )
    );
    const status: Record<string, string> = {};
    questionSets.forEach((questionSet, index) => {
      status[questionSet] =
        answers[index].length === questions[index].length &&
        answers[index].every(
          ({ status }) => status === "SUBMITTED" || status === "APPROVED"
        )
          ? "SUBMITTED"
          : "IN_PROGRESS";
    });
    return res.status(200).json(status);
  } catch (err) {
    next(err);
  }
}
