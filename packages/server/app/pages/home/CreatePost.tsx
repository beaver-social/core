import Icon from "@/shared/components/Icon";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/shared/components/ui/tooltip";
import { useState } from "react";

export default function CreatePost() {
    const [content, setContent] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create the API request object
        const apiRequest = {
            content,
            images: images.map(image => ({
                file: image,
                name: image.name,
                type: image.type,
                size: image.size
            }))
        };

        console.log("API Request Object:", apiRequest);

        // Reset form
        setContent("");
        setImages([]);
        setPreviewUrls([]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setImages(prevImages => [...prevImages, ...files]);
            // Create preview URLs
            const newUrls = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(prevUrls => [...prevUrls, ...newUrls]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        setPreviewUrls(prevUrls => {
            URL.revokeObjectURL(prevUrls[index]);
            return prevUrls.filter((_, i) => i !== index);
        });
    };

    return (
        <div className="p-4 border-b">
            <form onSubmit={handleSubmit} className="flex gap-4">
                <img src="/images/user.png" alt="User avatar" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <textarea
                        placeholder="What's happening?"
                        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                    >
                                        <Icon name="X" className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-4 text-primary">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <label className="hover:bg-primary/10 p-2 rounded-full cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <Icon name="Image" className="size-5" />
                                        </label>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add images
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button type="button" className="hover:bg-primary/10 p-2 rounded-full">
                                            <Icon name="Smile" className="size-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add emoji
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!content.trim()}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}