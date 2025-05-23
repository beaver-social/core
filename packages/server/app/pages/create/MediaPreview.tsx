import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/shared/components/Image";
import Icon from "@/shared/components/Icon";
import { Button } from "@/shared/components/ui/button";

type MediaFile = {
  file: File;
  type: "image" | "video";
  previewUrl: string;
  aspectRatio?:
    | "square"
    | "portrait"
    | "landscape"
    | "banner"
    | "wide"
    | "custom";
};

interface MediaPreviewProps {
  mediaFiles: MediaFile[];
  onRemove: (index: number) => void;
}

export default function MediaPreview({
  mediaFiles,
  onRemove,
}: MediaPreviewProps) {
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});

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

  // Get layout class based on number of media files
  const getGridClassName = () => {
    switch (mediaFiles.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-2 grid-rows-2";
      default:
        return "grid-cols-2 grid-rows-2";
    }
  };

  return (
    <div
      className={`grid ${getGridClassName()} gap-2 w-full rounded-lg overflow-hidden`}
    >
      {mediaFiles.map((media, index) => (
        <motion.div
          key={media.previewUrl}
          className={`relative ${
            mediaFiles.length === 1
              ? media.aspectRatio === "square"
                ? "aspect-square"
                : "aspect-[3/4]"
              : "aspect-square"
          } rounded-md overflow-hidden`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setIsHovering(index)}
          onMouseLeave={() => setIsHovering(null)}
        >
          {media.type === "image" ? (
            <Image
              src={media.previewUrl}
              alt={`Media ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full bg-black">
              <video
                src={media.previewUrl}
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
                      const video = e.currentTarget
                        .closest(".relative")
                        ?.querySelector("video");
                      if (video) toggleVideoPlay(index, video);
                    }}
                  >
                    <Icon name="Play" className="size-6" />
                  </Button>
                </div>
              )}
            </div>
          )}

          <AnimatePresence>
            {(isHovering === index || mediaFiles.length > 1) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 right-2"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-black/50 hover:bg-black/70 text-white h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                >
                  <Icon name="X" className="size-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {media.type === "video" && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              Video
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
