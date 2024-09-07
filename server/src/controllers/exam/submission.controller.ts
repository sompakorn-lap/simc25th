import { useAccessToken } from "@/libs/crypto/token";
import prisma from "@/libs/prisma/prisma";
import { QuestionSet } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export async function getSubmission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);
    const { questionSet } = req.params as { questionSet: QuestionSet };

    const available = await prisma.submission.findUnique({
      where: { userId_questionSet: { userId, questionSet } },
      omit: { id: true },
    });
    if (available) return res.status(200).json(available);

    const questions = await prisma.question.findMany({
      where: { questionSet },
    });
    const questionIds = questions.map(({ questionId }) => questionId);
    const submission = await prisma.submission.create({
      data: {
        userId,
        questionSet,
        questionIds,
      },
      omit: {
        id: true,
      },
    });
    return res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
}
