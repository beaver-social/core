import { useState, useEffect, useRef, useCallback } from 'react';
import ShortVideo from './ShortVideo';
import { sampleShorts, ShortVideoData } from './mockData';
import { useInView } from './useInView';

export default function ShortsFeed() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [shorts, setShorts] = useState<ShortVideoData[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loadError, setLoadError] = useState(false);

    // Bottom loader element to detect when to load more
    const [loaderRef, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });

    // Initialize with some shorts
    useEffect(() => {
        try {
            setShorts(sampleShorts.slice(0, 2));
        } catch (error) {
            console.error("Error initializing shorts feed:", error);
            setLoadError(true);
        }
    }, []);

    // Load more shorts when reaching the end
    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            // Simulate API fetch delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // In a real app, you'd fetch from an API with pagination
            // For now, we'll just add more from our sample data
            const currentLength = shorts.length;

            // Only load 2 videos at a time to prevent performance issues
            const moreShorts = sampleShorts.slice(currentLength, currentLength + 2);

            if (moreShorts.length > 0) {
                setShorts(prev => [...prev, ...moreShorts]);
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
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // Only render videos that are currently active, about to be active, or just were active
    // This helps with performance by not rendering too many video elements at once
    const shouldRenderVideo = (index: number) => {
        return Math.abs(index - activeIndex) <= 1;
    };

    if (loadError) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-background text-center p-6">
                <div>
                    <p className="text-red-500 font-semibold mb-2">Failed to load shorts</p>
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
            className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar"
        >
            {shorts.map((short, index) => (
                <div
                    key={short.id}
                    className="h-full w-full snap-start"
                >
                    {shouldRenderVideo(index) ? (
                        <ShortVideo
                            {...short}
                            isActive={index === activeIndex}
                        />
                    ) : (
                        // Placeholder to maintain scroll position when video isn't rendered
                        <div className="h-full w-full bg-black" />
                    )}
                </div>
            ))}

            {/* Loading indicator */}
            {hasMore && (
                <div
                    ref={loaderRef}
                    className="h-20 flex items-center justify-center"
                >
                    {loading && (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    )}
                </div>
            )}
        </div>
    );
} 