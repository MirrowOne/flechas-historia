"use client";
import { Arrow } from "@/components/Arrow";
import { useActionDetector } from "@/hooks/useActionDetector";
import { useEffect, useState } from "react";

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
