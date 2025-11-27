import { useEffect, useState } from "react";
import { Arrow } from "@/components/Arrow";

const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

export function useActionDetector() {
  const [arrows, setArrows] = useState<ArrowDirections[] | null>(null);
  const [action, setAction] = useState<ArrowDirections>("down");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const action = processKey(key);
      console.log("action", action);
      if (!action) return;
      setAction(action);
      catchArrow(action);
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

  return { action, arrows, clearArrows };
}

const processKey = (key: string): ArrowDirections => {
  // Convertimos a minúsculas para facilitar la comparación (útil para WASD)
  const normalizedKey = key.toLowerCase();

  if (normalizedKey === "arrowup" || normalizedKey === "w") {
    // console.log(DIRECTIONS.UP);
    return DIRECTIONS.UP;
  }
  if (normalizedKey === "arrowdown" || normalizedKey === "s") {
    // console.log(DIRECTIONS.DOWN);
    return DIRECTIONS.DOWN;
  }
  if (normalizedKey === "arrowleft" || normalizedKey === "a") {
    // console.log(DIRECTIONS.LEFT);
    return DIRECTIONS.LEFT;
  }
  if (normalizedKey === "arrowright" || normalizedKey === "d") {
    // console.log(DIRECTIONS.RIGHT);
    return DIRECTIONS.RIGHT;
  }

  return "down";
};
