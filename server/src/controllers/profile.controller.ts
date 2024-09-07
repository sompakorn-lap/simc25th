import prisma from "@/libs/prisma/prisma";
import FailedResponse from "@/utils/FailedResponse";
import { NextFunction, Request, Response } from "express";
import { useAccessToken } from "@/libs/crypto/token";

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);

    const profile = await prisma.profile.findUnique({
      where: { userId },
      omit: { id: true, userId: true },
    });
    if (!profile) throw new FailedResponse(404, "");

    return res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new FailedResponse(404, "");

    const { status } = profile;
    if (status !== "IN_PROGRESS") throw new FailedResponse(409, "");

    await prisma.profile.update({ where: { userId }, data: req.body });
    return res.status(200).send("");
  } catch (err) {
    next(err);
  }
}

export async function submitProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = await useAccessToken(req);

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new FailedResponse(404, "");

    const { status } = profile;
    if (status !== "IN_PROGRESS") throw new FailedResponse(409, "");

    await prisma.profile.update({
      where: { userId },
      data: { ...req.body, status: "SUMITTED" },
    });
    return res.status(200).send("");
  } catch (err) {
    next(err);
  }
}

export async function getProfileByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params as { userId: string };

    const profile = await prisma.profile.findUnique({
      where: { userId },
      omit: { id: true, userId: true },
    });
    if (!profile) throw new FailedResponse(404, "");

    return res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
}

export async function approveProfileByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new FailedResponse(404, "");

    const { status } = profile;
    if (status !== "SUMITTED") throw new FailedResponse(409, "");

    await prisma.profile.update({
      where: { userId, status: "SUMITTED" },
      data: { status: "APPROVED" },
    });
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
}
