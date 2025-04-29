import { uploadToS3 } from "./upload";

const client = new Bun.S3Client({
  accessKeyId: Bun.env.R2_ACCESS_KEY_ID,
  secretAccessKey: Bun.env.R2_SECRET_ACCESS_KEY,
  bucket: Bun.env.R2_BUCKET_NAME,
  endpoint: Bun.env.R2_ENDPOINT,
});

const attachments = { upload: uploadToS3 };

const s3 = { ...client, ...attachments } as typeof client & typeof attachments;

export default s3;
