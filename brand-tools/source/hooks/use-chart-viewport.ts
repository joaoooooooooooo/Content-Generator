"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

type ViewportState = {
  isInView: boolean;
  hasEnteredView: boolean;
};

function intersectsViewport(node: Element): boolean {
  const rect = node.getBoundingClientRect();
  return rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
}

export function useChartViewport<T extends Element>(ref: RefObject<T | null>): ViewportState {
  const [state, setState] = useState<ViewportState>({
    isInView: false,
    hasEnteredView: false,
  });

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = (isInView: boolean) =>
      setState((current) => ({
        isInView,
        hasEnteredView: current.hasEnteredView || isInView,
      }));

    // Static report exports must include charts that have never been scrolled into view.
    if (node.closest(".report-document") || typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      update(true);
      return;
    }

    update(intersectsViewport(node));

    const observer = new IntersectionObserver(
      ([entry]) => {
        update(entry?.isIntersecting ?? false);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return state;
}
