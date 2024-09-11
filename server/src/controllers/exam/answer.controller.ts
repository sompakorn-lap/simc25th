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
      data: { ...req.body, status: "SUBMITTED" },
    });

    const question = await prisma.question.findUnique({
      where: { questionId },
    });
    if (!question) throw new FailedResponse(404, "");

    const { questionType } = question;
    if (questionType === "MCQ") {
      const { choices } = question;
      const { answer } = req.body as { answer: string };
      const index = choices.map(({ text }) => text).indexOf(answer);
      const score = choices[index].score;
      await prisma.answer.update({
        where: {
          userId_questionId: { userId, questionId },
        },
        data: { score, status: "APPROVED" },
      });
    }

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

export async function approveAnswerByUserIdAndQuestionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, questionId } = req.params as {
      userId: string;
      questionId: string;
    };
    const { score } = req.body as { score: number };

    const answer = await prisma.answer.findUnique({
      where: { userId_questionId: { userId, questionId } },
    });
    if (!answer) throw new FailedResponse(404, "");

    const { status } = answer;
    if (status !== "SUBMITTED") throw new FailedResponse(409, "");

    await prisma.answer.update({
      where: { userId_questionId: { userId, questionId } },
      data: { score, status: "APPROVED" },
    });
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
}

export async function getSubmittedAnswersByQuestionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { questionId } = req.params as { questionId: string };
    const answers = await prisma.answer.findMany({
      where: { questionId, status: "SUBMITTED" },
    });
    return res.status(200).json(answers);
  } catch (err) {
    next(err);
  }
}

export async function getAnswerByUserIdAndQuestionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, questionId } = req.params as {
      userId: string;
      questionId: string;
    };
    const answers = await prisma.answer.findUnique({
      where: { userId_questionId: { userId, questionId } },
    });
    return res.status(200).json(answers);
  } catch (err) {
    next(err);
  }
}
