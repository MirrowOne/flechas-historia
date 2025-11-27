"use client";
import { useEffect, useState } from "react";
import "./arrow.css";

type ArrowDirections = "up" | "down" | "left" | "right";

const Arrow = ({ direction }: { direction: ArrowDirections }) => {
  return (
    <div className={`arrow-container ${direction}`}>
      <header className="arrowhead"></header>
      <main className="arrowbody"></main>
    </div>
  );
};

const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

function useActionDetector() {
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

export default function Home() {
  const { action: direction } = useActionDetector();

  useEffect(() => {
    console.log("ultima", direction);
  }, [direction]);

  const getMessage = () => {
    switch (direction) {
      case "up":
        return "arriba";
      case "down":
        return "abajo";
      case "left":
        return "izquierda";
      case "right":
        return "derecha";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <p>{getMessage()}</p>
        <Arrow direction={direction} />
      </div>
    </div>
  );
}
