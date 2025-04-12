import s3 from "./client";
import { randomUUID } from "crypto";

/**
 * Uploads a buffer to S3 and returns the URL of the uploaded file
 * @param buffer The file buffer to upload
 * @param contentType The content type of the file
 * @param folder The folder to upload to within the bucket
 * @returns The URL of the uploaded file
 */
export async function uploadToS3(
  buffer: Buffer,
  contentType: string,
  folder: string = "media"
): Promise<string> {
  try {
    const key = `${folder}/${randomUUID()}`;

    await s3.write(key, buffer);

    // Construct the URL based on the R2 endpoint and bucket name
    const baseUrl =
      process.env.R2_PUBLIC_URL ||
      `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}`;
    return `${baseUrl}/${key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to storage");
  }
}

/**
 * Upload an image to S3 after processing it
 * @param processedBuffer The processed (optimized/compressed) image buffer
 * @param format The format of the image (jpeg, png, etc.)
 * @returns The URL of the uploaded image
 */
export async function uploadProcessedImage(
  processedBuffer: Buffer,
  format: string = "jpeg"
): Promise<string> {
  return uploadToS3(processedBuffer, `image/${format}`);
}

/**
 * Upload a video to S3 after processing it
 * @param videoBuffer The processed video buffer to upload
 * @param format The format of the video (mp4, webm, etc.)
 * @returns The URL of the uploaded video
 */
export async function uploadProcessedVideo(
  videoBuffer: Buffer,
  format: string = "mp4"
): Promise<string> {
  return uploadToS3(videoBuffer, `video/${format}`, "videos");
}

/**
 * Handle the media upload process - validates, processes, and uploads
 * @param imageBuffer The raw image buffer
 * @param optimizeFunc Optional function to optimize the image before upload
 * @returns The S3 URL of the uploaded image
 */
export async function handleImageUpload(
  imageBuffer: Buffer,
  optimizeFunc?: (buffer: Buffer) => Promise<Buffer>
): Promise<string> {
  try {
    // Apply optimization if function provided
    const finalBuffer = optimizeFunc
      ? await optimizeFunc(imageBuffer)
      : imageBuffer;

    // Upload to S3
    return await uploadProcessedImage(finalBuffer);
  } catch (error) {
    console.error("Error in image upload process:", error);
    throw new Error("Failed to process and upload image");
  }
}

/**
 * Handle the video upload process - validates, processes, and uploads
 * @param videoBuffer The raw video buffer
 * @param compressFunc Optional function to compress the video before upload
 * @returns The S3 URL of the uploaded video
 */
export async function handleVideoUpload(
  videoBuffer: Buffer,
  compressFunc?: (buffer: Buffer) => Promise<Buffer>
): Promise<string> {
  try {
    // Apply compression if function provided
    const finalBuffer = compressFunc
      ? await compressFunc(videoBuffer)
      : videoBuffer;

    // Upload to S3
    return await uploadProcessedVideo(finalBuffer);
  } catch (error) {
    console.error("Error in video upload process:", error);
    throw new Error("Failed to process and upload video");
  }
}
