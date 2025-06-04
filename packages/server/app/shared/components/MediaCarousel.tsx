import { useState } from "react";
import Icon from "./Icon";
import { Image } from "./Image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MediaCarouselProps {
  media: {
    id: number;
    postId: number | null;
    url: string;
    type: string;
  }[];
  className?: string;
}

export default function MediaCarousel({
  media,
  className = "",
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setErrorImages((prev) => new Set(prev).add(index));
  };

  const retryImage = (index: number) => {
    setErrorImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  // Toggle video play state
  const toggleVideoPlay = (index: number, video: HTMLVideoElement) => {
    if (video.paused) {
      video.play();
      setIsPlaying((prev) => ({ ...prev, [index]: true }));
    } else {
      video.pause();
      setIsPlaying((prev) => ({ ...prev, [index]: false }));
    }
  };

  // Handle video events to keep state in sync
  const handleVideoPlay = (index: number) => {
    setIsPlaying((prev) => ({ ...prev, [index]: true }));
  };

  const handleVideoPause = (index: number) => {
    setIsPlaying((prev) => ({ ...prev, [index]: false }));
  };

  if (!media.length) return null;

  return (
    <>
      <div className={`relative max-w-2xl mx-auto ${className}`}>
        <div className={`relative bg-secondary overflow-hidden rounded-lg`}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            speed={300}
            threshold={5}
            resistanceRatio={0.85}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.activeIndex);
              // Pause all videos when changing slides
              document.querySelectorAll("video").forEach((video, idx) => {
                if (!video.paused) {
                  video.pause();
                }
              });
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            navigation={{
              nextEl: ".carousel-button-next",
              prevEl: ".carousel-button-prev",
            }}
            className="w-full h-full"
            style={{ height: "100%" }}
          >
            {media.map((item, index) => (
              <SwiperSlide key={index} className="w-full h-full flex items-center justify-center">
                {item.type.includes("image") ? (
                  errorImages.has(index) ? (
                    <button
                      onClick={() => retryImage(index)}
                      className="absolute inset-0 flex items-center justify-center flex-col"
                    >
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
                  <div
                    className="relative w-full h-full bg-black cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = e.currentTarget.querySelector("video");
                      if (video) toggleVideoPlay(index, video);
                    }}
                  >
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      onPlay={() => handleVideoPlay(index)}
                      onPause={() => handleVideoPause(index)}
                      onLoadedData={() => handleVideoPause(index)} // Initialize as paused
                      loop
                      controls={false}
                    />

                    {!isPlaying[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                        <div className="bg-black/50 text-white rounded-full p-3">
                          <Icon name="Play" className="size-8" />
                        </div>
                      </div>
                    )}

                    {isPlaying[index] && (
                      <div className="absolute inset-0 bg-transparent" />
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
    </>
  );
}
