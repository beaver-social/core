import sharp from "sharp";
import { encode as blurhash } from "blurhash";
import { MB } from "../../constants";

const SUPPORTED_IMAGE_FORMATS = ["jpeg", "jpg", "png", "webp"];

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

export async function preprocessImage(imageBuffer: Buffer) {
  const isValidFormat = await validateImageFormat(imageBuffer);

  if (!isValidFormat) {
    throw new Error(
      "Unsupported image format. Supported formats are: " +
        SUPPORTED_IMAGE_FORMATS.join(", ")
    );
  }

  const compressedBuffer = await compressImage(imageBuffer);
  const blurhash = await generateBlurhash(compressedBuffer);

  return {
    imageBuffer: compressedBuffer,
    blurhash: blurhash,
  };
}
