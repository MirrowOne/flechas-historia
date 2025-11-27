"use client";
import { Arrow } from "@/components/Arrow";
import { useActionDetector } from "@/hooks/useActionDetector";
import { useEffect, useState } from "react";

export default function Home() {
  const { action: direction } = useActionDetector();

  const CATCHED_ARROWS = [
    <Arrow key={1} direction="up" />,
    <Arrow key={2} direction="down" />,
    <Arrow key={3} direction="left" />,
    <Arrow key={4} direction="right" />,
  ];

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
        <section className="flex gap-5">{CATCHED_ARROWS}</section>
        <p>{getMessage()}</p>
        <Arrow direction={direction} />
      </div>
    </div>
  );
}
