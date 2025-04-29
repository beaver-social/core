import { useState } from 'react';
import Icon from './Icon';
import { Image } from "./Image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ImageCarouselProps {
    images: string[];
    className?: string;
    aspectRatio: 'square' | 'portrait';
}

export default function ImageCarousel({ images, className = '', aspectRatio }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

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
        <div className={`relative max-w-2xl mx-auto ${className}`}>
            <div className={`relative bg-secondary overflow-hidden ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                }`}>
                <Swiper
                    modules={[Navigation, EffectFade, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    effect="slide"
                    speed={300}
                    threshold={5}
                    resistanceRatio={0.85}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet carousel-dot',
                        bulletActiveClass: 'carousel-dot-active',
                    }}
                    navigation={{
                        nextEl: '.carousel-button-next',
                        prevEl: '.carousel-button-prev',
                    }}
                    className="w-full h-full"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="w-full h-full">
                            {errorImages.has(index) ? (
                                <button onClick={() => retryImage(index)} className="absolute inset-0 flex items-center justify-center flex-col">
                                    <div className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all">
                                        <Icon name="RefreshCw" className="w-6 h-6" />
                                    </div>
                                </button>
                            ) : (
                                <Image
                                    src={image}
                                    alt={`Image ${index + 1} of ${images.length}`}
                                    className="w-full h-full object-cover"
                                    onError={() => handleImageError(index)}
                                />
                            )}
                        </SwiperSlide>
                    ))}

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button className="carousel-button-prev absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10">
                                <Icon name="ChevronLeft" className="w-5 h-5" />
                            </button>
                            <button className="carousel-button-next absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10">
                                <Icon name="ChevronRight" className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </Swiper>
            </div>
        </div>
    );
} 