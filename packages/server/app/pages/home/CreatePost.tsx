import Icon from "@/shared/components/Icon";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/shared/components/ui/tooltip";
import { useState, useCallback, useMemo } from "react";
import ImageCropDialog from "@/shared/components/ImageCropDialog";
import imageCompression from 'browser-image-compression';

type ImageWithAspectRatio = {
    file: File;
    aspectRatio: 'square' | 'portrait';
};

const compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: 0.8,
};

export default function CreatePost() {
    const [content, setContent] = useState("");
    const [images, setImages] = useState<ImageWithAspectRatio[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [showCropDialog, setShowCropDialog] = useState(false);
    const [tempFile, setTempFile] = useState<File | null>(null);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<'square' | 'portrait' | null>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Compress all images before sending
            const compressedImages = await Promise.all(
                images.map(async (image) => {
                    const compressedFile = await imageCompression(image.file, compressionOptions);
                    return {
                        file: compressedFile,
                        name: compressedFile.name,
                        type: compressedFile.type,
                        size: compressedFile.size,
                        aspectRatio: image.aspectRatio
                    };
                })
            );

            const apiRequest = {
                content,
                images: compressedImages
            };

            console.log("API Request Object:", apiRequest);

            // Reset form
            setContent("");
            setImages([]);
            setPreviewUrls([]);
            setSelectedAspectRatio(null);
        } catch (error) {
            console.error('Error compressing images:', error);
        }
    }, [content, images]);

    const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            try {
                // Compress the image before showing the crop dialog
                const compressedFile = await imageCompression(selectedFile, compressionOptions);
                setTempFile(compressedFile);
                setShowCropDialog(true);
            } catch (error) {
                console.error('Error compressing image:', error);
            }
        }
    }, []);

    const handleCrop = useCallback((croppedFile: File, aspectRatio: 'square' | 'portrait') => {
        setSelectedAspectRatio(aspectRatio);
        setImages(prevImages => [...prevImages, { file: croppedFile, aspectRatio }]);
        setPreviewUrls(prevUrls => [...prevUrls, URL.createObjectURL(croppedFile)]);
        setShowCropDialog(false);
        setTempFile(null);
    }, []);

    const removeImage = useCallback((index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        setPreviewUrls(prevUrls => {
            URL.revokeObjectURL(prevUrls[index]);
            return prevUrls.filter((_, i) => i !== index);
        });
        // If removing the last image, reset the aspect ratio
        if (images.length === 1) {
            setSelectedAspectRatio(null);
        }
    }, [images.length]);

    // Cleanup preview URLs when component unmounts
    useCallback(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    // Memoize the preview grid to prevent unnecessary re-renders
    const previewGrid = useMemo(() => {
        if (previewUrls.length === 0) return null;

        return (
            <div className="grid grid-cols-2 gap-2 mt-2">
                {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                        <div className={`relative ${images[index].aspectRatio === 'square' ? 'aspect-square' : 'aspect-[3/4]'}`}>
                            <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                                loading="lazy"
                            />
                        </div>
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
        );
    }, [previewUrls, images, removeImage]);

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
                    {previewGrid}
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-1 text-primary">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <label className="hover:bg-primary/10 p-2 rounded-full cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileSelect}
                                            />
                                            <Icon name="ImagePlus" className="size-5" />
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
                                            <Icon name="SmilePlus" className="size-5" />
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
                            className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!content.trim()}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
            {tempFile && (
                <ImageCropDialog
                    isOpen={showCropDialog}
                    onClose={() => {
                        setShowCropDialog(false);
                        setTempFile(null);
                    }}
                    image={tempFile}
                    onCrop={handleCrop}
                    initialAspectRatio={selectedAspectRatio || undefined}
                />
            )}
        </div>
    );
}