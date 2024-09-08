import { uploadFile } from "@/libs/google/ggdrive";
import prisma from "@/libs/prisma/prisma";
import FailedResponse from "@/utils/FailedResponse";
import { QuestionSet, QuestionType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

type Choice = {
  text: string;
  score: number;
};

type CreateQuestionReqBodyType = {
  questionSet: QuestionSet;
  questionType: QuestionType;
  questionText: string;
  questionImageData: string | null;
  choices: Choice[];
};

export async function createQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { questionImageData, choices, ...data } =
      req.body as CreateQuestionReqBodyType;

    const questionImageName = questionImageData
      ? await uploadFile(
          "exam",
          `questionImage-${randomUUID()}`,
          questionImageData
        )
      : null;

    await prisma.question.create({
      data: {
        ...data,
        questionImageName,
        choices,
      },
    });
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
      omit: { id: true },
    });
    if (!question) throw new FailedResponse(404, "");
    return res.status(200).json(question);
  } catch (err) {
    next(err);
  }
}
