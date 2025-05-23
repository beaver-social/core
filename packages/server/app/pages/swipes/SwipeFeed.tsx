import { useState, useEffect, useRef, useCallback } from "react";
import ShortVideo from "./SwipeVideo";
import { sampleShorts, ShortVideoData } from "./mockData";
import { useInView } from "../../shared/hooks/useInView";
import { useGlobalUIStore } from "@/shared/stores/zustand";

export default function ShortsFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shorts, setShorts] = useState<ShortVideoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);
  // Track which videos have been preloaded
  const preloadedVideos = useRef<Set<string>>(new Set());
  // Get global mute state from Zustand
  const { isMuted, toggleMute } = useGlobalUIStore();

  // Bottom loader element to detect when to load more
  const [loaderRef, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  // Initialize with some shorts
  useEffect(() => {
    try {
      // Start with 4 videos instead of 2 to have more preloaded content
      const initialShorts = sampleShorts.slice(0, 4);
      setShorts(initialShorts);

      // Preload the first video immediately
      if (initialShorts.length > 0) {
        preloadVideo(initialShorts[0].videoUrl);
      }
    } catch (error) {
      console.error("Error initializing shorts feed:", error);
      setLoadError(true);
    }
  }, []);

  // Function to preload a video
  const preloadVideo = useCallback((videoUrl: string) => {
    // Skip if already preloaded
    if (preloadedVideos.current.has(videoUrl)) return;

    // Create a hidden video element to preload
    const preloadElement = document.createElement("video");
    preloadElement.src = videoUrl;
    preloadElement.preload = "auto";
    preloadElement.muted = true;
    preloadElement.style.display = "none";
    preloadElement.setAttribute("playsinline", "");

    // Add network priority
    if ("fetchPriority" in preloadElement) {
      (preloadElement as any).fetchPriority = "high";
    }

    // Start loading the video
    preloadElement.load();

    // Just load a bit of the video to prepare it for playback
    preloadElement.onloadeddata = () => {
      // Once loaded, we no longer need this element
      // but we'll keep it around for a bit to ensure caching
      setTimeout(() => {
        document.body.removeChild(preloadElement);
      }, 5000);

      // Mark as preloaded
      preloadedVideos.current.add(videoUrl);
    };

    // Add to DOM to ensure loading
    document.body.appendChild(preloadElement);
  }, []);

  // Load more shorts when reaching the end
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      // Simulate API fetch delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In a real app, you'd fetch from an API with pagination
      const currentLength = shorts.length;

      // Load more videos at once to ensure we have enough preloaded content
      const moreShorts = sampleShorts.slice(currentLength, currentLength + 3);

      if (moreShorts.length > 0) {
        setShorts((prev) => [...prev, ...moreShorts]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more shorts:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, shorts.length]);

  // Trigger load more when bottom loader is visible
  useEffect(() => {
    if (inView && !loadError) {
      loadMore();
    }
  }, [inView, loadMore, loadError]);

  // Preload videos around the active video
  useEffect(() => {
    if (shorts.length === 0) return;

    // Preload the next 3 videos for seamless playback
    for (let i = 1; i <= 3; i++) {
      const nextIndex = activeIndex + i;
      if (nextIndex < shorts.length) {
        preloadVideo(shorts[nextIndex].videoUrl);
      }
    }
  }, [activeIndex, shorts, preloadVideo]);

  // Update active video based on scroll position
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const videoHeight = container.clientHeight;

    // Calculate which video is currently most visible
    const index = Math.round(scrollTop / videoHeight);
    if (index >= 0 && index < shorts.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [activeIndex, shorts.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive: true for better scroll performance
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Wrapper for toggle mute to handle event stopping
  const handleToggleMute = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      toggleMute();
    },
    [toggleMute],
  );

  // Determine which videos to render to balance performance and loading
  const shouldRenderVideo = (index: number) => {
    // Always render active video and adjacent videos (3 videos total)
    return Math.abs(index - activeIndex) <= 2;
  };

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background text-center p-6">
        <div>
          <p className="text-red-500 font-semibold mb-2">
            Failed to load shorts
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar sm:rounded-t-2xl"
    >
      {shorts.map((short, index) => (
        <div
          key={short.id}
          className="h-full w-full snap-start flex items-center justify-center"
        >
          {shouldRenderVideo(index) ? (
            <ShortVideo
              {...short}
              isActive={index === activeIndex}
              isMuted={isMuted}
              toggleMute={handleToggleMute}
            />
          ) : (
            // Placeholder to maintain scroll position when video isn't rendered
            <div className="h-full w-full bg-black" />
          )}
        </div>
      ))}

      {/* Loading indicator */}
      {hasMore && (
        <div ref={loaderRef} className="h-20 flex items-center justify-center">
          {loading && (
            <Icon name="loader" className="animate-spin size-8 text-primary" />
          )}
        </div>
      )}
    </div>
  );
}
