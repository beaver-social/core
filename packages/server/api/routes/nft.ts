import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createCanvas, loadImage } from "canvas";

export default new Hono()

    .get("/img",
        zValidator(
            "query",
            z.object({
                name: z.string(),
            }),
        ),
        async (ctx) => {
            const { name } = ctx.req.valid("query");

            const response = await fetch(
                "https://4kwallpapers.com/images/wallpapers/bojack-horseman-2048x2048-9465.jpeg"
            );
            const imageBuffer = await response.arrayBuffer();

            const image = await loadImage(Buffer.from(imageBuffer));
            const canvas = createCanvas(image.width, image.height);
            const ctxCanvas = canvas.getContext("2d");

            ctxCanvas.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctxCanvas.font = "bold 300px Arial";
            ctxCanvas.fillStyle = "white";
            ctxCanvas.textAlign = "center";
            ctxCanvas.textBaseline = "middle";

            ctxCanvas.fillText(name, canvas.width / 2, canvas.height / 2);

            const finalImageBuffer = canvas.toBuffer("image/png");

            return ctx.body(finalImageBuffer, 200, {
                "Content-Type": "image/png",
            });

        },
    )
