import { useRef, useCallback, useEffect } from "react";

type Props = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export default function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
}: Props) {
  const bottomRef = useRef(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5,
      rootMargin: "0px 0px 500px 0px",
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [handleIntersection]);

  return { infiniteScrollRef: bottomRef };
}
