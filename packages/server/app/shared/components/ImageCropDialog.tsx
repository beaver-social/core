import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface ImageCropDialogProps {
    isOpen: boolean;
    onClose: () => void;
    image: File;
    onCrop: (croppedFile: File) => void;
}

export default function ImageCropDialog({ isOpen, onClose, image, onCrop }: ImageCropDialogProps) {
    const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait'>('square');
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [image]);

    useEffect(() => {
        if (imageRef.current && containerRef.current) {
            const img = imageRef.current;
            const container = containerRef.current;

            // Calculate initial crop area
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            let cropWidth, cropHeight;
            if (aspectRatio === 'square') {
                cropWidth = cropHeight = Math.min(imgWidth, imgHeight);
            } else {
                cropWidth = imgWidth;
                cropHeight = (imgWidth * 4) / 3;
            }

            setCropArea({
                x: (imgWidth - cropWidth) / 2,
                y: (imgHeight - cropHeight) / 2,
                width: cropWidth,
                height: cropHeight
            });
        }
    }, [aspectRatio, image]);

    const handleCrop = async () => {
        if (!imageRef.current) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to crop area
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;

        // Draw cropped image
        ctx.drawImage(
            imageRef.current,
            cropArea.x,
            cropArea.y,
            cropArea.width,
            cropArea.height,
            0,
            0,
            cropArea.width,
            cropArea.height
        );

        // Convert to blob
        const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
            }, 'image/jpeg', 0.95);
        });

        // Create new file
        const croppedFile = new File([blob], image.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
        });

        onCrop(croppedFile);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Crop Image</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center gap-4">
                        <Button
                            variant={aspectRatio === 'square' ? 'default' : 'outline'}
                            onClick={() => setAspectRatio('square')}
                        >
                            Square
                        </Button>
                        <Button
                            variant={aspectRatio === 'portrait' ? 'default' : 'outline'}
                            onClick={() => setAspectRatio('portrait')}
                        >
                            4:3
                        </Button>
                    </div>
                    <div
                        ref={containerRef}
                        className="relative w-full aspect-square bg-black/5 rounded-lg overflow-hidden"
                    >
                        <img
                            ref={imageRef}
                            src={previewUrl}
                            alt="Preview"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full"
                            style={{
                                width: cropArea.width,
                                height: cropArea.height,
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleCrop}>
                            Crop
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 