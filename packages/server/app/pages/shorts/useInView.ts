import { useState, useEffect, useRef, RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);
  const { threshold = 0.8, rootMargin = "0px" } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref as RefObject<T>, isInView];
}
