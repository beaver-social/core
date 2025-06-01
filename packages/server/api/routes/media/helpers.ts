import ImageKit from "imagekit";
import env from "../../../env";

const imageKit = new ImageKit({
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadMedia(media: File, tags?: string[]) {
  const arrayBuffer = await media.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const result = imageKit.upload({
    file: fileBuffer,
    fileName: media.name || "beaver-social-asset",
    tags,
  });

  return result;
}
