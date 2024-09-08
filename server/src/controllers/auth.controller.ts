import { NextFunction, Request, Response } from "express";
import prisma from "@/libs/prisma/prisma";
import {
  createAccessToken,
  createRefreshToken,
  useAccessToken,
  validateRefreshToken,
} from "@/libs/crypto/token";
import { uploadFile } from "@/libs/google/ggdrive";
import FailedResponse from "@/utils/FailedResponse";

type SignUpReqBody = {
  fullname: string;
  telephone: string;
  lineID: string;
  email: string;
  citizenId: string;
  citizenImageData: string;
  grade: string;
};

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { citizenImageData, ...data } = req.body as SignUpReqBody;

    const { email, citizenId } = data;
    const duplicate = await prisma.user.findFirst({
      where: { OR: [{ email }, { citizenId }] },
    });
    if (duplicate)
      throw new FailedResponse(
        409,
        "หมายเลขบัตรประจำตัวประชาชนหรืออีเมลด้านบนถูกใช้ไปแล้ว"
      );

    const { userId } = await prisma.user.create({
      data: {
        email,
        citizenId,
        userRole: "APPLICANT",
      },
    });
    await uploadFile("user", `citizenImage-${userId}`, citizenImageData);
    await prisma.profile.create({
      data: {
        userId,
        ...data,
      },
    });

    await createRefreshToken({ userId, email, citizenId });
    return res.status(200).send("");
  } catch (err) {
    next(err);
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { signinToken } = req.params as { signinToken: string };
    const { expired, ...data } = await validateRefreshToken(signinToken);

    if (expired) {
      await createRefreshToken(data);
      throw new FailedResponse(401, "");
    }

    const user = await prisma.user.findUnique({ where: data });
    if (!user) throw new FailedResponse(401, "");

    const { userId, userRole } = user;
    const accessTokenData = { userId, userRole };
    await createAccessToken(res, accessTokenData);
    return res.status(200).json(accessTokenData);
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = await useAccessToken(req);

    const user = await prisma.user.findUnique({
      where: { userId },
    });
    if (!user) throw new FailedResponse(401, "");

    const { userRole } = user;
    await createAccessToken(res, { userId, userRole });
    return res.status(200).json({ userId, userRole });
  } catch (err) {
    next(err);
  }
}
