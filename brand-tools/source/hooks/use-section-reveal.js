import { useEffect, useRef } from "react";

// Each shared section owns its content; nested sections manage their own reveal.
export function useSectionReveal({ includeSections = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (container?.closest(".report-document") || !container || !window.IntersectionObserver || preference.matches) return;

    const targets = [];
    function collect(parent) {
      for (const child of parent.children) {
        if (child.matches('[aria-hidden="true"], [hidden], script, style')) continue;
        if (child.matches('section') && !includeSections) continue;

        // Walk through layout wrappers so individual headings and grid cards
        // stagger, but keep cards, widgets, and animation canvases together.
        const hasText = Array.from(child.childNodes).some(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
        );
        const isComponent = child.matches('[data-slot], [role], [data-reveal-item]')
          || child.querySelector("canvas, :scope > svg")
          || /(?:^|\s)(?:\S+:)?(?:border(?:-\S+)?|bg-\S+|rounded(?:-\S+)?|shadow(?:-\S+)?)(?:\s|$)/.test(child.className);
        const isLayout = child.tagName === "DIV"
          && child.children.length > 0 && !hasText && !isComponent;

        if (child.querySelector("section") || isLayout) {
          collect(child);
        } else {
          targets.push(child);
        }
      }
    }
    collect(container);

    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.style.setProperty("--reveal-stagger", Math.min(stagger++, 8));
        target.dataset.sectionReveal = "visible";
        observer.unobserve(target);
      }
    }, { threshold: 0 });

    for (const target of targets) {
      target.dataset.sectionReveal = "pending";
      observer.observe(target);
    }

    // Keyboard navigation must never focus content that is still transparent.
    function revealFocused(event) {
      for (const target of targets) {
        if (target.contains(event.target)) {
          delete target.dataset.sectionReveal;
          observer.unobserve(target);
        }
      }
    }
    function reset() {
      observer.disconnect();
      for (const target of targets) {
        delete target.dataset.sectionReveal;
        target.style.removeProperty("--reveal-stagger");
      }
    }
    function onPreferenceChange() {
      if (preference.matches) reset();
    }
    container.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      reset();
      container.removeEventListener("focusin", revealFocused);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [includeSections]);

  return ref;
}
