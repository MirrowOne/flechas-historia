import { useEffect, useState } from "react";

const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

export function useActionDetector() {
  const [action, setAction] = useState<ArrowDirections>("down");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const action = processKey(key);
      if (!action) return;
      setAction(action);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { action };
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
