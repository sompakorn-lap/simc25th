import { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { createToken, validateToken } from "./crypto";
import { sendMail } from "@/libs/google/gmail";
import FailedResponse from "@/utils/FailedResponse";
import SignInEmail from "./signin.email";

type RefreshTokenType = {
  userId: string;
  email: string;
  citizenId: string;
};

export async function createRefreshToken(data: RefreshTokenType) {
  const refreshTokenSecretKey = process.env
    .AUTH_REFRESHTOKEN_SECRETKEY as string;
  const refreshTokenMaxAge = parseInt(
    process.env.AUTH_REFRESHTOKEN_MAXAGE as string
  );

  const refreshToken = createToken<RefreshTokenType>(
    data,
    refreshTokenSecretKey,
    refreshTokenMaxAge
  );

  const { email, citizenId } = data;
  await sendMail({
    to: email,
    subject: "SIMC25th: sign-in link",
    html: SignInEmail({ citizenId, signinToken: refreshToken }),
  });
}

export async function validateRefreshToken(token: string) {
  const refreshTokenSecretKey = process.env
    .AUTH_REFRESHTOKEN_SECRETKEY as string;

  const { userId, email, citizenId, expired } = validateToken<RefreshTokenType>(
    token,
    refreshTokenSecretKey
  );

  return { userId, email, citizenId, expired };
}

type AccessTokenType = {
  userId: string;
  userRole: UserRole;
};

export async function createAccessToken(
  response: Response,
  data: AccessTokenType
) {
  const accessTokenSecretKey = process.env.AUTH_ACCESSTOKEN_SECRETKEY as string;
  const accessTokenMaxAge = parseInt(
    process.env.AUTH_ACCESSTOKEN_MAXAGE as string
  );

  const accessToken = createToken<AccessTokenType>(
    data,
    accessTokenSecretKey,
    accessTokenMaxAge
  );

  response.cookie("accessToken", accessToken, { maxAge: accessTokenMaxAge });
}

export async function validateAccessToken(token: string) {
  const accessTokenSecretKey = process.env.AUTH_ACCESSTOKEN_SECRETKEY as string;

  const { userId, userRole, expired } = validateToken<AccessTokenType>(
    token,
    accessTokenSecretKey
  );

  return { userId, userRole, expired };
}

export async function useAccessToken(req: Request) {
  const { accessToken } = req.cookies as { accessToken: string };
  if (!accessToken) throw new FailedResponse(401, "");

  const data = await validateAccessToken(accessToken);

  const { expired } = data;
  if (expired) throw new FailedResponse(401, "");

  return data;
}
