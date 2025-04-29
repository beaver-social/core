import env from "../../../env";
import s3 from "./client";
import { randomUUID } from "crypto";

export async function uploadToS3(
  buffer: Buffer,
  folder: string = "media"
): Promise<string> {
  try {
    const key = `${folder}/${randomUUID()}`;

    await s3.write(key, buffer);

    const baseUrl = `${env.R2_ENDPOINT}/${env.R2_BUCKET_NAME}`;
    return `${baseUrl}/${key}`;
  } catch (error) {
    throw new Error("Failed to upload file to storage");
  }
}
