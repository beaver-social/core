import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";
import { promisify } from "util";
import { createWriteStream, unlink } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { FfprobeData, FfprobeStream } from "fluent-ffmpeg";
import { MAX_POST_CONTENT_LENGTH, MB } from "../../constants";
import { tryCatchSync } from "../../lib/tryCatch";
import { encode as blurhash } from "blurhash";

const SUPPORTED_IMAGE_FORMATS = ["jpeg", "jpg", "png", "webp", "gif"];
const SUPPORTED_VIDEO_CODECS = ["h264", "vp8", "vp9", "av1", "hevc", "h265"];

function extractTopics(content: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  const matches = content.match(hashtagRegex);

  if (!matches) return [];

  return matches.map((tag) => tag.slice(1)); // Remove the # symbol
}

function extractMentions(content: string): string[] {
  const mentionRegex = /@(\w+)/g;
  const matches = content.match(mentionRegex);

  if (!matches) return [];

  return matches.map((mention) => mention.slice(1)); // Remove the @ symbol
}

function sanitizePostContent(content: string): string {
  const sanitized = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

  const normalized = sanitized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  return normalized.trim().slice(0, MAX_POST_CONTENT_LENGTH);
}

export async function preprocessPostContent(content: string): Promise<{
  content: string;
  topics: string[];
  mentions: string[];
}> {
  return new Promise((resolve, reject) => {
    const { data: sanitized, error } = tryCatchSync(() =>
      sanitizePostContent(content),
    );

    if (error) {
      reject(new Error("Failed to sanitize post content", { cause: error }));
      throw new Error(error.message, { cause: error.cause });
    }

    const topics = extractTopics(sanitized);
    const mentions = extractMentions(sanitized);

    const processedContent = {
      content: sanitized,
      topics,
      mentions,
    };

    resolve(processedContent);
  });
}

async function compressImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    let quality = 80;

    let webpBuffer = await sharp(imageBuffer).webp({ quality }).toBuffer();

    while (webpBuffer.length > 1 * MB && quality > 20) {
      quality -= 10;
      webpBuffer = await sharp(imageBuffer)
        .webp({ quality })
        .resize({ width: 1280, withoutEnlargement: true })
        .toBuffer();
    }

    if (webpBuffer.length > 1 * MB) {
      throw new Error("Image too large (make sure image is under 1MB)");
    }

    return webpBuffer;
  } catch (error) {
    if (imageBuffer.length < 1 * MB) {
      return imageBuffer; // Return original if it's already small enough
    } else {
      throw new Error("Image too large (make sure image is under 1MB)");
    }
  }
}

async function generateBlurhash(imageBuffer: Buffer) {
  const image = sharp(imageBuffer).resize(32, 32, { fit: "inside" });

  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  const blurHash = blurhash(new Uint8ClampedArray(data), width, height, 4, 4);

  return blurHash;
}

async function validateImageFormat(imageBuffer: Buffer): Promise<boolean> {
  const metadata = await sharp(imageBuffer).metadata();

  return SUPPORTED_IMAGE_FORMATS.includes(metadata.format?.toLowerCase() || "");
}

export async function preprocessImageMedia(imageBuffer: Buffer) {
  const isValidFormat = await validateImageFormat(imageBuffer);

  if (!isValidFormat) {
    throw new Error(
      "Unsupported image format. Supported formats are: " +
        SUPPORTED_IMAGE_FORMATS.join(", "),
    );
  }

  const compressedBuffer = await compressImage(imageBuffer);
  const blurhash = await generateBlurhash(compressedBuffer);

  return {
    imageBuffer: compressedBuffer,
    blurhash: blurhash,
  };
}

async function validateVideoFormat(videoBuffer: Buffer): Promise<boolean> {
  const tempFilePath = await bufferToTempFile(videoBuffer, "mp4");
  return new Promise<boolean>((resolve) => {
    ffmpeg.ffprobe(
      tempFilePath,
      async (err: Error | null, metadata: FfprobeData) => {
        await cleanupTempFile(tempFilePath);

        if (err) {
          console.error("Error validating video format:", err);
          resolve(false);
          return;
        }

        const hasVideoStream = metadata.streams.some(
          (stream: FfprobeStream) => stream.codec_type === "video",
        );

        const hasValidCodec = metadata.streams.some(
          (stream: FfprobeStream) =>
            stream.codec_type === "video" &&
            stream.codec_name &&
            SUPPORTED_VIDEO_CODECS.includes(stream.codec_name),
        );

        resolve(hasVideoStream && hasValidCodec);
      },
    );
  });
}

async function generateVideoBlurhash(videoBuffer: Buffer) {
  const tempFilePath = await bufferToTempFile(videoBuffer, "mp4");
  const thumbnailPath = tempFilePath.replace(".mp4", "_thumb.jpg");

  const thumbnail = new Promise<Buffer>((resolve, reject) => {
    ffmpeg(tempFilePath)
      .screenshots({
        timestamps: ["10%"],
        filename: path.basename(thumbnailPath),
        folder: path.dirname(thumbnailPath),
        size: "480x?",
      })
      .on("end", async () => {
        try {
          const fs = require("fs").promises;
          const thumbnailBuffer = await fs.readFile(thumbnailPath);

          await cleanupTempFile(tempFilePath);
          await cleanupTempFile(thumbnailPath);

          resolve(thumbnailBuffer);
        } catch (err: any) {
          reject(err);
        }
      })
      .on("error", async (err: Error) => {
        await cleanupTempFile(tempFilePath);
        await cleanupTempFile(thumbnailPath).catch(console.error);

        console.error("Error generating video thumbnail:", err);
        reject(err);
      });
  });

  const blurhash = await generateBlurhash(await thumbnail);

  return blurhash;
}

async function compressVideo(videoBuffer: Buffer): Promise<Buffer> {
  const inputPath = await bufferToTempFile(videoBuffer, "mp4");
  const outputPath = inputPath.replace(".mp4", "_compressed.mp4");

  return new Promise<Buffer>((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .preset("medium")
      .videoBitrate("1000k")
      .size("?x720")
      .fps(30)
      .audioCodec("aac")
      .audioBitrate("128k")
      .format("mp4")
      .output(outputPath)
      .on("end", async () => {
        try {
          const fs = require("fs").promises;
          const compressedBuffer = await fs.readFile(outputPath);

          await cleanupTempFile(inputPath);
          await cleanupTempFile(outputPath);

          resolve(compressedBuffer);
        } catch (err: any) {
          reject(err);
        }
      })
      .on("error", async (err: Error) => {
        await cleanupTempFile(inputPath);
        await cleanupTempFile(outputPath).catch(console.error);

        console.error("Error compressing video:", err);
        reject(err);
      })
      .run();
  });
}

export async function preprocessVideoMedia(videoBuffer: Buffer) {
  const isValidFormat = await validateVideoFormat(videoBuffer);

  if (!isValidFormat) {
    throw new Error(
      "Unsupported video format. Supported formats are: " +
        SUPPORTED_VIDEO_CODECS.join(", "),
    );
  }

  const compressedBuffer = await compressVideo(videoBuffer);
  const thumbnailBlurhash = await generateVideoBlurhash(compressedBuffer);

  return {
    videoBuffer: compressedBuffer,
    thumbnail: { blurhash: thumbnailBlurhash },
  };
}

const unlinkAsync = promisify(unlink);
async function cleanupTempFile(filePath: string): Promise<void> {
  try {
    await unlinkAsync(filePath);
  } catch (error) {
    console.error("Error cleaning up temp file:", error);
  }
}

async function bufferToTempFile(
  buffer: Buffer,
  extension: string,
): Promise<string> {
  const tempFilePath = path.join(
    process.cwd(),
    "tmp",
    `${randomUUID()}.${extension}`,
  );
  return new Promise((resolve, reject) => {
    const writeStream = createWriteStream(tempFilePath);
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    readable.pipe(writeStream);
    writeStream.on("finish", () => resolve(tempFilePath));
    writeStream.on("error", reject);
  });
}
