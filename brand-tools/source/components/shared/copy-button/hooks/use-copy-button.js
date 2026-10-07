import { useEffect, useRef, useState } from "react";

export function useCopyButton({
  copiedDuration = 2000,
  copiedLabel = "Copied",
  text,
}) {
  const timeoutRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(text ?? window.location.href);
    setCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, copiedDuration);
  }

  return {
    copied,
    copiedLabel,
    handleCopy,
  };
}
