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

export default function ImageCropDialog({ isOpen, onClose, image, onCrop, initialAspectRatio }: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait'>(initialAspectRatio || 'square');
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

    // Memoize the image URL to prevent recreating it on every render
    const imageUrl = useMemo(() => URL.createObjectURL(image), [image]);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
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

        // Set canvas size to match the crop size
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

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
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise<File>((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) return;
                const file = new File([blob], image.name, { type: 'image/jpeg' });
                resolve(file);
            }, 'image/jpeg', 0.8); // Use 0.8 quality for better performance
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
                <DialogHeader>
                    <DialogTitle>Crop Image</DialogTitle>
                </DialogHeader>
                <div className="relative h-[400px] w-full">
                    <Cropper
                        image={imageUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio === 'square' ? 1 : 3 / 4}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
                {!initialAspectRatio && (
                    <div className="flex justify-center gap-4 mt-4">
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
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleCrop}>Crop & Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}