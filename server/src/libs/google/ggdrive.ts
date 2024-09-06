import { Request, Response } from "express";
import { google } from "googleapis";
import { PassThrough } from "stream";
import ggauth from "./ggauth";
import prisma from "@/libs/prisma/prisma";

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

  return fileId;
}

export async function viewFile(request: Request, response: Response) {
  try {
    const { fileName } = request.params as { fileName: string };

    const file = await prisma.file.findUnique({ where: { fileName } });
    if (!file) return response.status(404).send();

    const { fileId } = file;
    const { headers, data } = await ggdrive.files.get(
      { fileId, alt: "media", fields: "mimeType" },
      { responseType: "stream" }
    );

    response.setHeader("Content-Type", headers["content-type"]);
    data.pipe(response);
  } catch (err) {
    console.error(err);
    return response.status(500).send();
  }
}
