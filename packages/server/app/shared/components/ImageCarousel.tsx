import { useState } from 'react';
import Icon from './Icon';

interface ImageCarouselProps {
    images: string[];
    className?: string;
    aspectRatio: 'square' | 'portrait';
}

export default function ImageCarousel({ images, className = '', aspectRatio }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

    const nextImage = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
    };

    const previousImage = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleImageError = (index: number) => {
        setErrorImages(prev => new Set(prev).add(index));
    };

    const retryImage = (index: number) => {
        setErrorImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    };

    if (!images.length) return null;

    return (
        <div className={`relative ${className}`}>
            {/* Main Image */}
            <div className={`relative bg-secondary rounded-xl overflow-hidden ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                }`}>
                {errorImages.has(currentIndex) ? (
                    <button onClick={() => retryImage(currentIndex)} className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all">
                            <Icon name="RefreshCw" className="w-6 h-6" />
                        </div>
                    </button>
                ) : (
                    <img
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1} of ${images.length}`}
                        className="w-full h-full object-contain"
                        onError={() => handleImageError(currentIndex)}
                    />
                )}

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        {currentIndex > 0 && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    previousImage();
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                            >
                                <Icon name="ChevronLeft" className="w-5 h-5" />
                            </button>
                        )}
                        {currentIndex < images.length - 1 && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                            >
                                <Icon name="ChevronRight" className="w-5 h-5" />
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Image Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex
                                ? 'bg-black/60'
                                : errorImages.has(index)
                                    ? 'bg-red-500'
                                    : 'bg-black/30'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
} 