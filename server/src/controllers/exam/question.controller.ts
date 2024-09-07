import { uploadFile } from "@/libs/google/ggdrive";
import prisma from "@/libs/prisma/prisma";
import FailedResponse from "@/utils/FailedResponse";
import { QuestionSet, QuestionType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export async function createQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { questionSet, questionType } = req.body as {
      questionSet: QuestionSet;
      questionType: QuestionType;
    };
    const { questionId } = await prisma.question.create({
      data: {
        questionSet,
        questionType,
      },
    });

    const { questionText } = req.body as { questionText: string };
    if (questionType === "WRITING") {
      await prisma.writingQuestion.create({
        data: {
          questionId,
          questionText,
        },
      });
    }
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
}

export async function getQuestionByQuestionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { questionId } = req.params as { questionId: string };

    const question = await prisma.question.findUnique({
      where: { questionId },
    });
    if (!question) throw new FailedResponse(404, "");

    const { questionType } = question;
    if (questionType === "WRITING") {
      const writingQuestion = await prisma.writingQuestion.findUnique({
        where: { questionId },
        omit: { id: true, questionId: true },
      });
      if (!writingQuestion) throw new FailedResponse(404, "");
      return res.status(200).json({ ...writingQuestion, questionType });
    }
  } catch (err) {
    next(err);
  }
}
