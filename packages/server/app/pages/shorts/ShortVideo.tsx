import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import Icon from '@/shared/components/Icon';
import { Image } from '@/shared/components/Image';

interface ShortVideoProps {
    id: string;
    videoUrl: string;
    username: string;
    handle: string;
    caption: string;
    likes: number;
    comments: number;
    shares: number;
    avatarUrl: string;
    isActive: boolean;
}

export default function ShortVideo({
    id,
    videoUrl,
    username,
    handle,
    caption,
    likes,
    comments,
    shares,
    avatarUrl,
    isActive
}: ShortVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [videoError, setVideoError] = useState(false);

    // Control video playback based on active state
    useEffect(() => {
        if (videoRef.current && !videoError) {
            if (isActive) {
                videoRef.current.play().catch(err => {
                    console.error('Error playing video:', err);
                    setVideoError(true);
                });
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isActive, videoError]);

    const togglePlayPause = () => {
        if (videoRef.current && !videoError) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => {
                    console.error('Error playing video:', err);
                    setVideoError(true);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current && !videoError) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleVideoError = () => {
        console.error('Video failed to load:', videoUrl);
        setVideoError(true);
    };

    return (
        <div className="relative h-full w-full bg-black overflow-hidden snap-center">
            {!videoError ? (
                /* Video */
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="h-full w-full object-cover"
                    loop
                    playsInline
                    muted={isMuted}
                    onClick={togglePlayPause}
                    onError={handleVideoError}
                />
            ) : (
                /* Fallback when video fails to load */
                <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black p-6 text-center">
                    <Icon name="Video" className="w-16 h-16 text-gray-500 mb-4" />
                    <h3 className="text-white text-lg font-semibold mb-2">Video unavailable</h3>
                    <p className="text-gray-400 mb-4 max-w-xs">
                        This content couldn't be played in your browser
                    </p>
                </div>
            )}

            {/* Play/Pause overlay - only show if video is working */}
            {!isPlaying && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-3 bg-black/30 rounded-full">
                        <Icon name="Play" className="w-8 h-8 text-white" />
                    </div>
                </div>
            )}

            {/* Video controls - only show if video is working */}
            {!videoError && (
                <div className="absolute bottom-4 right-4 z-10">
                    <button
                        onClick={toggleMute}
                        className="mb-4 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
                    >
                        <Icon name={isMuted ? "VolumeX" : "Volume2"} className="w-6 h-6" />
                    </button>
                </div>
            )}

            {/* User info and caption - show regardless of video status */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()} className="block">
                        <Image
                            src={avatarUrl}
                            alt={username}
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                    </Link>
                    <div className="flex-1">
                        <Link
                            to={`/profile/${handle}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold text-white hover:underline flex items-center gap-1"
                        >
                            {username} <span className="text-white/70 text-sm font-normal">@{handle}</span>
                        </Link>
                        <p className="text-white/90 text-sm mt-1">{caption}</p>
                    </div>
                </div>
            </div>

            {/* Action buttons - show regardless of video status */}
            <div className="absolute right-4 bottom-20 flex flex-col gap-6">
                <button
                    onClick={toggleLike}
                    className="flex flex-col items-center"
                >
                    <div className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
                        <Icon
                            name="Heart"
                            className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`}
                        />
                    </div>
                    <span className="text-white text-xs mt-1">{isLiked ? likes + 1 : likes}</span>
                </button>

                <button className="flex flex-col items-center">
                    <div className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
                        <Icon name="MessageCircle" className="w-6 h-6" />
                    </div>
                    <span className="text-white text-xs mt-1">{comments}</span>
                </button>

                <button className="flex flex-col items-center">
                    <div className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
                        <Icon name="Share" className="w-6 h-6" />
                    </div>
                    <span className="text-white text-xs mt-1">{shares}</span>
                </button>
            </div>
        </div>
    );
} 