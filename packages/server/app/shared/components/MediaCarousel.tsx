import { useState } from 'react';
import Icon from './Icon';
import { Image } from "./Image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper/modules';
import { Button } from "./ui/button";

interface MediaCarouselProps {
    media: {
        id: number;
        postId: number;
        url: string;
        blurhash: string | null;
        aspectRatio: 'square' | 'portrait';
        type: 'image' | 'video';
    }[];
    className?: string;
}

export default function MediaCarousel({ media, className = '' }: MediaCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
    const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});

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

    // Toggle video play state
    const toggleVideoPlay = (index: number, video: HTMLVideoElement) => {
        if (video.paused) {
            video.play();
            setIsPlaying(prev => ({ ...prev, [index]: true }));
        } else {
            video.pause();
            setIsPlaying(prev => ({ ...prev, [index]: false }));
        }
    };

    if (!media.length) return null;

    return (
        <div className={`relative max-w-2xl mx-auto ${className}`}>
            <div className={`relative bg-secondary overflow-hidden ${media[0].aspectRatio === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                }`}>
                <Swiper
                    modules={[Navigation, EffectFade, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    effect="slide"
                    speed={300}
                    threshold={5}
                    resistanceRatio={0.85}
                    onSlideChange={(swiper) => {
                        setCurrentIndex(swiper.activeIndex);
                        // Pause all videos when changing slides
                        document.querySelectorAll('video').forEach(video => {
                            video.pause();
                        });
                        // Reset playing state
                        setIsPlaying({});
                    }}
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
                    {media.map((item, index) => (
                        <SwiperSlide key={index} className="w-full h-full">
                            {item.type === 'image' ? (
                                errorImages.has(index) ? (
                                    <button onClick={() => retryImage(index)} className="absolute inset-0 flex items-center justify-center flex-col">
                                        <div className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all">
                                            <Icon name="RefreshCw" className="w-6 h-6" />
                                        </div>
                                    </button>
                                ) : (
                                    <Image
                                        src={item.url}
                                        alt={`Image ${index + 1} of ${media.length}`}
                                        className="w-full h-full object-cover"
                                        onError={() => handleImageError(index)}
                                    />
                                )
                            ) : (
                                <div className="relative w-full h-full bg-black">
                                    <video
                                        src={item.url}
                                        className="w-full h-full object-cover"
                                        onClick={(e) => toggleVideoPlay(index, e.currentTarget)}
                                        loop
                                        muted
                                    />

                                    {!isPlaying[index] && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const video = e.currentTarget.closest('.relative')?.querySelector('video');
                                                    if (video) toggleVideoPlay(index, video);
                                                }}
                                            >
                                                <Icon name="Play" className="size-6" />
                                            </Button>
                                        </div>
                                    )}

                                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                        Video
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}

                    {/* Navigation Arrows */}
                    {media.length > 1 && (
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