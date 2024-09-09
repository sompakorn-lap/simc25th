import { useAccessToken } from "@/libs/crypto/token";
import { uploadFile } from "@/libs/google/ggdrive";
import prisma from "@/libs/prisma/prisma";
import FailedResponse from "@/utils/FailedResponse";
import { NextFunction, Request, Response } from "express";

export async function uploadDocument(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);

    const duplicate = await prisma.document.findUnique({ where: { userId } });
    if (duplicate) throw new FailedResponse(409, "");

    const { transactionImageData, transcriptFileData, permissionFileData } =
      req.body as {
        transactionImageData: string;
        transcriptFileData: string;
        permissionFileData: string;
      };

    const [transactionImageName, transcriptFileName, permissionFileName] =
      await Promise.all([
        uploadFile("user", `transactionImage-${userId}`, transactionImageData),
        uploadFile("user", `transcriptFile-${userId}`, transcriptFileData),
        uploadFile("user", `permissionFile-${userId}`, permissionFileData),
      ]);

    await prisma.document.create({
      data: {
        userId,
        transactionImageName,
        transcriptFileName,
        permissionFileName,
        status: "SUMITTED",
      },
    });
    return res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export async function getDocument(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);

    const available = await prisma.document.findUnique({
      where: { userId },
      omit: { id: true },
    });
    if (!available) return res.status(200).json({ status: "NOT_STARTED" });

    return res.status(200).json(available);
  } catch (err) {
    next(err);
  }
}

export async function getDocumentByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params as { userId: string };

    const document = await prisma.document.findUnique({
      where: { userId },
      omit: { id: true },
    });
    if (!document) throw new FailedResponse(404, "");

    return res.status(200).json(document);
  } catch (err) {
    next(err);
  }
}

export async function approveDocumentByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params as { userId: string };

    const document = await prisma.document.findUnique({
      where: { userId },
      omit: { id: true },
    });
    if (!document) throw new FailedResponse(404, "");

    const { status } = document;
    if (status !== "SUMITTED") throw new FailedResponse(409, "");

    return res.status(200).send();
  } catch (err) {
    next(err);
  }
}
