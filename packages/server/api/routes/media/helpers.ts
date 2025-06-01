import ImageKit from "imagekit";
import env from "../../../env";

const imageKit = new ImageKit({
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadImageToImageKit(
  media: File | string,
  tags?: string[]
) {
  if (typeof media === "string") {
    return media;
  }

  const arrayBuffer = await media.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const result = imageKit.upload({
    file: fileBuffer,
    fileName: media.name,
    tags,
  });

  return result;
}
