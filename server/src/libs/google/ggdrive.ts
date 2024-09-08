import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import { PassThrough } from "stream";
import ggauth from "./ggauth";
import prisma from "@/libs/prisma/prisma";
import FailedResponse from "@/utils/FailedResponse";

const ggdrive = google.drive({
  version: "v3",
  auth: ggauth,
});

export default ggdrive;

const folders = JSON.parse(process.env.GGDRIVE_FOLDERS as string);

export async function uploadFile(
  folder: string,
  fileName: string,
  base64url: string
) {
  const buffer = Buffer.from(base64url.split(",")[1], "base64");
  const bufferStream = new PassThrough();
  bufferStream.end(buffer);

  const { data } = await ggdrive.files.create({
    requestBody: {
      name: fileName,
      parents: [folders[folder]],
    },
    media: {
      body: bufferStream,
    },
  });

  const fileId = data.id as string;
  await prisma.file.create({
    data: {
      fileId,
      fileName,
    },
  });

  return fileName;
}

export async function viewFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fileName } = req.params as { fileName: string };

    const file = await prisma.file.findUnique({ where: { fileName } });
    if (!file) throw new FailedResponse(404, "file not found.");

    const { fileId } = file;
    const { headers, data } = await ggdrive.files.get(
      { fileId, alt: "media", fields: "mimeType" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", headers["content-type"]);
    data.pipe(res);
  } catch (err) {
    next(err);
  }
}
