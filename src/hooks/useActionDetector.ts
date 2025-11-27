import { useEffect, useState, useRef } from "react";

const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

const REVERSE_MAP: Record<ArrowDirections, ArrowDirections> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export function useActionDetector() {
  const [arrows, setArrows] = useState<ArrowDirections[] | null>(null);
  const [action, setAction] = useState<ArrowDirections>("down");
  const [realAction, setRealAction] = useState<ArrowDirections>("down");
  const [isReverse, setIsReverse] = useState(false);

  // Use ref to access current state in event listener
  const isReverseRef = useRef(isReverse);

  useEffect(() => {
    isReverseRef.current = isReverse;
  }, [isReverse]);

  const toggleReverse = () => {
    setIsReverse((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      let detectedAction = processKey(key);
      console.log("raw action", detectedAction);

      if (!detectedAction) return;

      // Always set the real physical action
      setRealAction(detectedAction);

      // Apply reverse logic if enabled for the history/processed action
      if (isReverseRef.current) {
        detectedAction = REVERSE_MAP[detectedAction];
        console.log("reversed action", detectedAction);
      }

      setAction(detectedAction);
      catchArrow(detectedAction);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const catchArrow = (arrow: ArrowDirections) => {
    if (!arrow) return;

    setArrows((prev) => [...(prev ?? []), arrow]);
  };

  const clearArrows = () => {
    setArrows(null);
  };

  return { action, realAction, arrows, clearArrows, isReverse, toggleReverse };
}

const processKey = (key: string): ArrowDirections | null => {
  // Convertimos a minúsculas para facilitar la comparación (útil para WASD)
  const normalizedKey = key.toLowerCase();

  if (normalizedKey === "arrowup" || normalizedKey === "w") {
    return DIRECTIONS.UP;
  }
  if (normalizedKey === "arrowdown" || normalizedKey === "s") {
    return DIRECTIONS.DOWN;
  }
  if (normalizedKey === "arrowleft" || normalizedKey === "a") {
    return DIRECTIONS.LEFT;
  }
  if (normalizedKey === "arrowright" || normalizedKey === "d") {
    return DIRECTIONS.RIGHT;
  }

  return null;
};
