import { useAccessToken } from "@/libs/crypto/token";
import prisma from "@/libs/prisma/prisma";
import FailedResponse from "@/utils/FailedResponse";
import { NextFunction, Request, Response } from "express";

export async function getAnswerByQuestionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);
    const { questionId } = req.params as { questionId: string };

    const available = await prisma.answer.findUnique({
      where: {
        userId_questionId: { userId, questionId },
      },
      omit: { id: true, userId: true },
    });
    if (available) return res.status(200).json(available);

    const question = await prisma.question.findUnique({
      where: { questionId },
    });
    if (!question) throw new FailedResponse(404, "");

    const { questionSet } = question;
    const answer = await prisma.answer.create({
      data: {
        userId,
        questionSet,
        questionId,
      },
      omit: { id: true, userId: true },
    });
    return res.status(201).json(answer);
  } catch (err) {
    next(err);
  }
}

export async function updateAnswerByQuestionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);
    const { questionId } = req.params as { questionId: string };

    const answer = await prisma.answer.findUnique({
      where: {
        userId_questionId: { userId, questionId },
      },
    });
    if (!answer) throw new FailedResponse(404, "");

    const { status } = answer;
    if (status !== "IN_PROGRESS") throw new FailedResponse(409, "");

    await prisma.answer.update({
      where: {
        userId_questionId: { userId, questionId },
      },
      data: req.body,
    });
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
}

export async function submitAnswerByQuestionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);
    const { questionId } = req.params as { questionId: string };

    await prisma.answer.update({
      where: {
        userId_questionId: { userId, questionId },
      },
      data: { ...req.body, status: "SUMITTED" },
    });

    const question = await prisma.question.findUnique({
      where: { questionId },
    });
    if (!question) throw new FailedResponse(404, "");

    const { questionSet } = question;
    await prisma.submission.update({
      where: { userId_questionSet: { userId, questionSet } },
      data: { currentIndex: { increment: 1 } },
    });
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
}
