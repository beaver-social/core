import { useState, useCallback, useMemo } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import Icon from './Icon';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    image: File;
    onCrop: (croppedFile: File, aspectRatio: 'square' | 'portrait') => void;
    initialAspectRatio?: 'square' | 'portrait';
}

// Maximum dimensions for web images
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export default function ImageCropDialog({ isOpen, onClose, image, onCrop, initialAspectRatio }: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait'>(initialAspectRatio || 'square');
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

    // Memoize the image URL to prevent recreating it on every render
    const imageUrl = useMemo(() => URL.createObjectURL(image), [image]);

    const onCropComplete = useCallback((croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = useCallback((url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', error => reject(error));
            image.src = url;
        }), []);

    const getCroppedImg = useCallback(async (imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        // Calculate dimensions while maintaining aspect ratio
        let width = pixelCrop.width;
        let height = pixelCrop.height;

        // Scale down if dimensions exceed maximum
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
        }

        // Set canvas size to match the crop size
        canvas.width = width;
        canvas.height = height;

        // Use imageSmoothingQuality for better performance
        ctx.imageSmoothingQuality = 'medium';
        ctx.imageSmoothingEnabled = true;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            width,
            height
        );

        return new Promise<File>((resolve) => {
            let quality = 0.8;
            const compressImage = () => {
                canvas.toBlob((blob) => {
                    if (!blob) return;

                    // If file is still too large, reduce quality and try again
                    if (blob.size > MAX_FILE_SIZE && quality > 0.1) {
                        quality -= 0.1;
                        compressImage();
                    } else {
                        const file = new File([blob], image.name, { type: 'image/jpeg' });
                        resolve(file);
                    }
                }, 'image/jpeg', quality);
            };

            compressImage();
        });
    }, [createImage]);

    const handleCrop = useCallback(async () => {
        if (!croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
            onCrop(croppedImage, aspectRatio);
            onClose();
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imageUrl, aspectRatio, onCrop, onClose, getCroppedImg]);

    // Cleanup the object URL when component unmounts or image changes
    useCallback(() => {
        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [imageUrl]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader className="pt-6">
                    <DialogTitle>Crop Image</DialogTitle>
                </DialogHeader>
                <div className="relative h-[500px] w-full bg-black">
                    <Cropper
                        image={imageUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio === 'square' ? 1 : 3 / 4}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        objectFit="contain"
                        showGrid={true}
                    />
                </div>
                {!initialAspectRatio && (
                    <div className="flex justify-center gap-4 py-4">
                        <Button
                            variant={aspectRatio === 'square' ? 'default' : 'outline'}
                            onClick={() => setAspectRatio('square')}
                        >
                            <Icon name="Square" className="mr-2" />
                            Square
                        </Button>
                        <Button
                            variant={aspectRatio === 'portrait' ? 'default' : 'outline'}
                            onClick={() => setAspectRatio('portrait')}
                        >
                            <Icon name="Image" className="mr-2" />
                            3:4 Portrait
                        </Button>
                    </div>
                )}
                <DialogFooter className="px-6 pb-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleCrop}>Crop & Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}