import { useState, useEffect } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollHook {
  currentPosition: ScrollPosition;
  isScrollingUp: boolean;
}

const isBrowser = typeof window !== `undefined`;

function getScrollPosition(): ScrollPosition {
  return isBrowser
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
}

export function useScrollPosition(): ScrollHook {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [position, setScrollPosition] = useState<ScrollPosition>(
    getScrollPosition()
  );

  useEffect(() => {
    let requestRunning: number | null = null;
    let previousYScrollPos = 0;
    let currentYScrollPos = 0;
    function handleScroll() {
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          currentYScrollPos = window.pageYOffset;
          setScrollPosition(getScrollPosition());
          if (currentYScrollPos > previousYScrollPos) {
            setIsScrollingUp(false);
          } else {
            setIsScrollingUp(true);
          }
          requestRunning = null;
        });
        previousYScrollPos = currentYScrollPos;
      }
    }

    if (isBrowser) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return { currentPosition: position, isScrollingUp };
}
