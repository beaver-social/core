import sharp from "sharp";
import {
  uploadProcessedImage,
  uploadProcessedVideo,
} from "../../lib/s3/upload";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";
import { promisify } from "util";
import { createWriteStream, unlink } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { DB } from "../../schema";
import { FfprobeData, FfprobeStream } from "fluent-ffmpeg";

// Convert stream or buffer to temporary file
async function bufferToTempFile(
  buffer: Buffer,
  extension: string
): Promise<string> {
  const tempFilePath = path.join(
    process.cwd(),
    "tmp",
    `${randomUUID()}.${extension}`
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

// Clean up temporary file
const unlinkAsync = promisify(unlink);
async function cleanupTempFile(filePath: string): Promise<void> {
  try {
    await unlinkAsync(filePath);
  } catch (error) {
    console.error("Error cleaning up temp file:", error);
  }
}

export async function compressImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    // Compress the image using a quality of 80% which balances size and quality well
    // Use mozjpeg compression which gives better results than the default
    return await sharp(imageBuffer)
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
  } catch (error) {
    console.error("Error compressing image:", error);
    return imageBuffer; // Return original if compression fails
  }
}

export async function generateThumbnail(imageBuffer: Buffer): Promise<Buffer> {
  try {
    // Create a small thumbnail for previews (150x150px)
    // Use fit: 'cover' to maintain aspect ratio and crop if needed
    return await sharp(imageBuffer)
      .resize(150, 150, {
        fit: "cover",
        position: "centre",
      })
      .jpeg({ quality: 80 })
      .toBuffer();
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    throw new Error("Failed to generate thumbnail");
  }
}

export async function validateImageFormat(
  imageBuffer: Buffer
): Promise<boolean> {
  try {
    // Get metadata to check format
    const metadata = await sharp(imageBuffer).metadata();

    // List of supported formats for social media
    const supportedFormats = ["jpeg", "jpg", "png", "webp", "gif"];

    return supportedFormats.includes(metadata.format?.toLowerCase() || "");
  } catch (error) {
    console.error("Error validating image format:", error);
    return false;
  }
}

export async function optimizeImageForFeed(
  imageBuffer: Buffer
): Promise<Buffer> {
  try {
    // Get metadata to preserve aspect ratio
    const metadata = await sharp(imageBuffer).metadata();

    // Calculate dimensions for feed (max width 1200px, maintaining aspect ratio)
    const width = Math.min(1200, metadata.width || 1200);

    // Process the image with settings optimized for feed display
    return await sharp(imageBuffer)
      .resize({
        width,
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({
        quality: 85,
        mozjpeg: true,
        force: false, // Will use input format if not JPEG
      })
      .toBuffer();
  } catch (error) {
    console.error("Error optimizing image for feed:", error);
    return imageBuffer; // Return original if optimization fails
  }
}

/**
 * Validates if the buffer is a supported video format
 * @param videoBuffer The video buffer to check
 * @returns Promise that resolves to boolean indicating validity
 */
export async function validateVideoFormat(
  videoBuffer: Buffer
): Promise<boolean> {
  try {
    // Create temporary file from buffer
    const tempFilePath = await bufferToTempFile(videoBuffer, "mp4");
    return new Promise<boolean>((resolve) => {
      ffmpeg.ffprobe(
        tempFilePath,
        async (err: Error | null, metadata: FfprobeData) => {
          // Clean up the temp file regardless of outcome
          await cleanupTempFile(tempFilePath);

          if (err) {
            console.error("Error validating video format:", err);
            resolve(false);
            return;
          }

          // Check if it has video streams
          const hasVideoStream = metadata.streams.some(
            (stream: FfprobeStream) => stream.codec_type === "video"
          );

          // List of supported video codecs
          const supportedCodecs = ["h264", "vp8", "vp9", "av1", "hevc", "h265"];

          // Check if any video stream has a supported codec
          const hasValidCodec = metadata.streams.some(
            (stream: FfprobeStream) =>
              stream.codec_type === "video" &&
              stream.codec_name &&
              supportedCodecs.includes(stream.codec_name)
          );

          resolve(hasVideoStream && hasValidCodec);
        }
      );
    });
  } catch (error) {
    console.error("Error in video validation:", error);
    return false;
  }
}

/**
 * Compresses a video for social media use
 * @param videoBuffer The video buffer to compress
 * @returns Promise that resolves to the compressed video buffer
 */
export async function compressVideo(videoBuffer: Buffer): Promise<Buffer> {
  try {
    // Create temporary input file from buffer
    const inputPath = await bufferToTempFile(videoBuffer, "mp4");
    const outputPath = inputPath.replace(".mp4", "_compressed.mp4");

    return new Promise<Buffer>((resolve, reject) => {
      ffmpeg(inputPath)
        // Use H.264 codec with a medium CPU preset
        .videoCodec("libx264")
        .preset("medium")
        // Max bitrate of 1Mbps for good quality/size balance
        .videoBitrate("1000k")
        // Resize to max height of 720p while maintaining aspect ratio
        .size("?x720")
        // Limit to 30fps
        .fps(30)
        // Use AAC audio codec
        .audioCodec("aac")
        // Audio bitrate of 128k
        .audioBitrate("128k")
        // Set output format
        .format("mp4")
        // Output to file
        .output(outputPath)
        .on("end", async () => {
          try {
            // Read the compressed file back into a buffer
            const fs = require("fs").promises;
            const compressedBuffer = await fs.readFile(outputPath);

            // Clean up temporary files
            await cleanupTempFile(inputPath);
            await cleanupTempFile(outputPath);

            resolve(compressedBuffer);
          } catch (err: any) {
            reject(err);
          }
        })
        .on("error", async (err: Error) => {
          // Clean up temporary files
          await cleanupTempFile(inputPath);
          await cleanupTempFile(outputPath).catch(console.error);

          console.error("Error compressing video:", err);
          reject(err);
        })
        .run();
    });
  } catch (error) {
    console.error("Error in video compression:", error);
    return videoBuffer; // Return original if compression fails
  }
}

/**
 * Generates a thumbnail from a video
 * @param videoBuffer The video buffer to generate a thumbnail from
 * @returns Promise that resolves to the thumbnail buffer
 */
export async function generateVideoThumbnail(
  videoBuffer: Buffer
): Promise<Buffer> {
  try {
    // Create temporary file from buffer
    const tempFilePath = await bufferToTempFile(videoBuffer, "mp4");
    const thumbnailPath = tempFilePath.replace(".mp4", "_thumb.jpg");

    return new Promise<Buffer>((resolve, reject) => {
      ffmpeg(tempFilePath)
        // Take a screenshot at 10% of the video
        .screenshots({
          timestamps: ["10%"],
          filename: path.basename(thumbnailPath),
          folder: path.dirname(thumbnailPath),
          size: "480x?",
        })
        .on("end", async () => {
          try {
            // Read the thumbnail file back into a buffer
            const fs = require("fs").promises;
            const thumbnailBuffer = await fs.readFile(thumbnailPath);

            // Clean up temporary files
            await cleanupTempFile(tempFilePath);
            await cleanupTempFile(thumbnailPath);

            resolve(thumbnailBuffer);
          } catch (err: any) {
            reject(err);
          }
        })
        .on("error", async (err: Error) => {
          // Clean up temporary files
          await cleanupTempFile(tempFilePath);
          await cleanupTempFile(thumbnailPath).catch(console.error);

          console.error("Error generating video thumbnail:", err);
          reject(err);
        });
    });
  } catch (error) {
    console.error("Error in thumbnail generation:", error);
    throw new Error("Failed to generate video thumbnail");
  }
}

/**
 * Compresses, optimizes and uploads an image to S3
 * @param imageBuffer The image buffer to process and upload
 * @returns The URL of the uploaded image
 */
export async function processAndUploadImage(
  imageBuffer: Buffer
): Promise<string> {
  // Validate format first
  const isValid = await validateImageFormat(imageBuffer);
  if (!isValid) {
    throw new Error("Invalid image format");
  }

  // Compress and optimize image
  const optimizedBuffer = await optimizeImageForFeed(imageBuffer);

  // Upload to S3 and get URL
  return await uploadProcessedImage(optimizedBuffer);
}

/**
 * Compresses, optimizes and uploads a video to S3
 * @param videoBuffer The video buffer to process and upload
 * @returns The URL of the uploaded video and its thumbnail URL
 */
export async function processAndUploadVideo(
  videoBuffer: Buffer
): Promise<{ videoUrl: string; thumbnailUrl: string }> {
  // Validate format first
  const isValid = await validateVideoFormat(videoBuffer);
  if (!isValid) {
    throw new Error("Invalid video format");
  }

  // Compress video (this could be time-consuming)
  const compressedBuffer = await compressVideo(videoBuffer);

  // Generate thumbnail
  const thumbnailBuffer = await generateVideoThumbnail(videoBuffer);

  // Upload both to S3 and get URLs
  const [videoUrl, thumbnailUrl] = await Promise.all([
    uploadProcessedVideo(compressedBuffer),
    uploadProcessedImage(thumbnailBuffer),
  ]);

  return {
    videoUrl,
    thumbnailUrl,
  };
}

/**
 * Creates a thumbnail and uploads it to S3
 * @param imageBuffer The original image buffer
 * @returns The URL of the uploaded thumbnail
 */
export async function createAndUploadThumbnail(
  imageBuffer: Buffer
): Promise<string> {
  const thumbnailBuffer = await generateThumbnail(imageBuffer);
  return await uploadProcessedImage(thumbnailBuffer, "jpeg");
}

export function sanitizePostContent(content: string): string {
  // Remove any potentially harmful HTML if not using markdown
  const sanitized = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

  // Normalize line breaks
  const normalized = sanitized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Trim whitespace and limit length (e.g., 5000 chars max)
  return normalized.trim().slice(0, 5000);
}

export function extractHashtags(content: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  const matches = content.match(hashtagRegex);

  if (!matches) return [];

  return matches.map((tag) => tag.slice(1)); // Remove the # symbol
}

export function extractMentions(content: string): string[] {
  const mentionRegex = /@(\w+)/g;
  const matches = content.match(mentionRegex);

  if (!matches) return [];

  return matches.map((mention) => mention.slice(1)); // Remove the @ symbol
}

export function validatePostContent(content: string): {
  valid: boolean;
  message?: string;
} {
  if (!content || content.trim().length === 0) {
    return { valid: false, message: "Post content cannot be empty" };
  }

  if (content.length > 5000) {
    return {
      valid: false,
      message: "Post content exceeds maximum length of 5000 characters",
    };
  }

  return { valid: true };
}

export function canUserModifyPost(
  userId: number,
  authorId: number,
  isAdmin: boolean = false
): boolean {
  // User can modify if they are the author or an admin
  return userId === authorId || isAdmin;
}

export function processPostForDisplay(post: DB["post"]): any {
  // Calculate time elapsed since post creation
  const now = Date.now();
  const createdAt = new Date(post.createdAt).getTime();
  const timeElapsed = Math.floor((now - createdAt) / 1000); // in seconds

  let timeAgo = "";
  if (timeElapsed < 60) {
    timeAgo = `${timeElapsed}s`;
  } else if (timeElapsed < 3600) {
    timeAgo = `${Math.floor(timeElapsed / 60)}m`;
  } else if (timeElapsed < 86400) {
    timeAgo = `${Math.floor(timeElapsed / 3600)}h`;
  } else {
    timeAgo = `${Math.floor(timeElapsed / 86400)}d`;
  }

  // Add computed fields to post
  return {
    ...post,
    timeAgo,
    hashtags: post.content ? extractHashtags(post.content) : [],
    mentions: post.content ? extractMentions(post.content) : [],
  };
}

export function getPaginationParams(
  page: number | string,
  limit: number | string
) {
  const pageNum = typeof page === "string" ? parseInt(page) : page;
  const limitNum = typeof limit === "string" ? parseInt(limit) : limit;

  return {
    limit: limitNum,
    offset: (pageNum - 1) * limitNum,
  };
}
