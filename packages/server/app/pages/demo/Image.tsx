import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useBeaver } from "@beaver/react";
import { useRef, useState } from "react";

export default function Image() {
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const beaver = useBeaver();
    const { mutateAsync: uploadMedia } = beaver.media.uploadMedia;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = await uploadMedia({
            media: images,
        });
    }

    return <div className="flex flex-col items-center justify-center h-screen gap-4">
        {previewUrls.map((url, index) => (
            <img key={index} src={url} alt="Image" className="object-cover w-1/2 rounded-md h-1/2" />
        ))}
        {previewUrls.length === 0 && (
            <p>No images selected</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
            <Input type="file" accept="image/*" name="image" className="p-2 border-2 border-gray-300 rounded-md" multiple onChange={(e) => {
                const files = e.target.files;
                if (files) {
                    setImages(Array.from(files));
                    setPreviewUrls(Array.from(files).map(file => URL.createObjectURL(file)));
                }
            }} />
            <Button variant={"outline"} type="submit">Upload</Button>
        </form>
    </div>;
}