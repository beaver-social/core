import { useState, useRef, useEffect, memo } from "react";
import { Link } from "react-router";
import Icon from "@/shared/components/Icon";
import { Image } from "@/shared/components/Image";
import { Button } from "@/shared/components/ui/button";
import { truncateText } from "@/shared/lib/utils";
interface ShortVideoProps {
  id: string;
  videoUrl: string;
  username: string;
  handle: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  avatarUrl: string;
  isActive: boolean;
  isMuted: boolean;
  toggleMute: (e: React.MouseEvent) => void;
}

// Using memo to prevent unnecessary re-renders
const SwipeVideo = memo(function SwipeVideo({
  id,
  videoUrl,
  username,
  handle,
  caption,
  likes,
  comments,
  shares,
  saves,
  avatarUrl,
  isActive,
  isMuted,
  toggleMute,
}: ShortVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const hasAttemptedPlay = useRef(false);

  // Control video playback based on active state
  useEffect(() => {
    if (!videoRef.current || videoError) return;

    if (isActive) {
      hasAttemptedPlay.current = true;
      // Add high priority to fetch
      if ("fetchPriority" in videoRef.current) {
        (videoRef.current as any).fetchPriority = "high";
      }

      // Only auto-play if the user hasn't manually paused the video
      if (!userPaused) {
        // Attempt to play with better error handling
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsBuffering(false);
            })
            .catch((err) => {
              console.error("Error playing video:", err);
              // Only set video error for permanent errors
              if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
                setVideoError(true);
              }
              setIsPlaying(false);
            });
        }
      }
    } else if (hasAttemptedPlay.current) {
      // Only pause if we've previously attempted to play
      // This prevents unnecessary operations on hidden videos
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, videoError, userPaused]);

  // Apply mute state whenever it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Optimize video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set optimal video attributes
    video.preload = "auto";
    video.playsInline = true;

    // Handle buffering state
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  // Handle playing when user changes
  useEffect(() => {
    // Reset userPaused when switching videos
    if (isActive && hasAttemptedPlay.current === false) {
      setUserPaused(false);
    }
  }, [isActive]);

  const togglePlayPause = () => {
    if (!videoRef.current || videoError) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setUserPaused(true);
    } else {
      // Clear user paused state when manually playing
      setUserPaused(false);

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
          })
          .catch((err) => {
            console.error("Error playing video:", err);
            if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
              setVideoError(true);
            }
          });
      }
    }
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleVideoError = () => {
    console.error("Video failed to load:", videoUrl);
    setVideoError(true);
    setIsBuffering(false);
  };

  return (
    <div className="relative h-full rounded-lg bg-black snap-center">
      {!videoError ? (
        /* Video */
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full object-cover"
            loop
            playsInline
            muted={isMuted}
            onError={handleVideoError}
          />

          {/* Make the entire video area clickable */}
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={togglePlayPause}
          ></div>

          {/* Buffering indicator */}
          {isBuffering && isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Video controls - mute button back inside each video, but controlling global state */}
          {!videoError && (
            <div className="absolute top-4 right-4 z-30">
              <button
                onClick={toggleMute}
                className="mb-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <Icon
                  name={isMuted ? "VolumeX" : "Volume2"}
                  className="w-6 h-6"
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Fallback when video fails to load */
        <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black p-6 text-center">
          <Icon name="Video" className="w-16 h-16 text-gray-500 mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">
            Video unavailable
          </h3>
          <p className="text-gray-400 mb-4 max-w-xs">
            This content couldn't be played in your browser
          </p>
        </div>
      )}

      {/* Play/Pause overlay - only show if video is working */}
      {!isPlaying && !videoError && !isBuffering && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20"
          onClick={togglePlayPause}
        >
          <div className="p-3 bg-black/30 rounded-full">
            <Icon name="Play" className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      {/* User info and caption - show regardless of video status */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Link
              to={`/app/profile/${handle}`}
              onClick={(e) => e.stopPropagation()}
              className="block"
            >
              <Image
                src={avatarUrl}
                alt={username}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to={`/app/profile/${handle}`}
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-white hover:underline flex items-center gap-1"
              >
                {handle}
              </Link>

              <Button variant="outline" className="text-sm text-white">
                Follow
              </Button>
            </div>
          </div>

          <p className="text-white/90 text-sm mt-1">
            {truncateText(caption, 50)}{" "}
            <span className="text-white/50 cursor-pointer hover:opacity-80 transition-opacity">
              more
            </span>
          </p>
        </div>
      </div>

      {/* Action buttons - show regardless of video status */}
      <div className="absolute right-5 bottom-12 flex flex-col gap-4 z-30">
        <button
          onClick={toggleLike}
          className="flex flex-col items-center hover:opacity-80 transition-opacity"
        >
          <div className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
            <Icon
              name="Heart"
              className={`w-6 h-6 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`}
            />
          </div>
          <span className="text-white text-xs mt-1">
            {isLiked ? likes + 1 : likes}
          </span>
        </button>

        <button className="flex flex-col items-center hover:opacity-80 transition-opacity">
          <div className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
            <Icon name="MessageCircle" className="w-6 h-6" />
          </div>
          <span className="text-white text-xs mt-1">{comments}</span>
        </button>

        <button className="flex flex-col items-center hover:opacity-80 transition-opacity">
          <div className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
            <Icon name="Send" className="w-6 h-6" />
          </div>
          <span className="text-white text-xs mt-1">{shares}</span>
        </button>

        <button className="flex flex-col items-center hover:opacity-80 transition-opacity">
          <div className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
            <Icon name="Bookmark" className="w-6 h-6" />
          </div>
          <span className="text-white text-xs mt-1">{saves}</span>
        </button>
      </div>
    </div>
  );
});

export default SwipeVideo;
