import { useEffect, useRef } from "react";

export const useScrollToCurrentTime = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToNowIndicator = () => {
      const indicator = containerRef.current?.querySelector(
        ".rbc-current-time-indicator"
      );

      if (indicator) {
        indicator.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    };

    const timeoutId = setTimeout(scrollToNowIndicator, 150);

    return () => clearTimeout(timeoutId);
  }, []);

  return { containerRef };
};
