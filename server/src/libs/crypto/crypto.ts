import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

type TokenDataType<T> = T & { expires: number; expired: boolean };

export function createToken<T>(
  data: T,
  secretKey: string,
  maxAge: number
): string {
  const expires: number = Date.now() + maxAge;

  const bufferSecretKey = Buffer.from(secretKey, "hex");
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-gcm", bufferSecretKey, iv);
  const encrypt =
    cipher.update(JSON.stringify({ ...data, expires }), "utf-8", "hex") +
    cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  const token = `${iv.toString("hex")}.${encrypt}.${authTag}`;
  return token;
}

export function validateToken<T>(
  token: string,
  secretKey: string
): TokenDataType<T> {
  const [iv, encrypt, authTag] = token.split(".");
  const bufferSecretKey = Buffer.from(secretKey, "hex");
  const bufferIv = Buffer.from(iv, "hex");
  const bufferAuthTag = Buffer.from(authTag, "hex");
  const dechiper = createDecipheriv("aes-256-gcm", bufferSecretKey, bufferIv);
  dechiper.setAuthTag(bufferAuthTag);
  const decrypt =
    dechiper.update(encrypt, "hex", "utf-8") + dechiper.final("utf-8");
  const data = JSON.parse(decrypt);

  const { expires } = data;
  const expired = expires - Date.now() < 0;
  return { ...data, expired };
}
