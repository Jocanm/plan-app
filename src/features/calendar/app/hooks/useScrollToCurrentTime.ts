import { useEffect } from "react";

export const useScrollToCurrentTime = () => {
  useEffect(() => {
    const scrollToNowIndicator = () => {
      const indicator = document.querySelector(".rbc-current-time-indicator");

      if (indicator) {
        indicator.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    };

    const timeoutId = setTimeout(scrollToNowIndicator, 50);

    return () => clearTimeout(timeoutId);
  }, []);
};
