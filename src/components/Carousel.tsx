"use client";

import { useRef, useState, useEffect } from "react";
import { Arrow } from "./Arrow";

interface CarouselProps {
  arrows: ArrowDirections[] | null;
}

const getArrowLabel = (direction: ArrowDirections) => {
  switch (direction) {
    case "up":
      return "Arriba";
    case "down":
      return "Abajo";
    case "left":
      return "Izquierda";
    case "right":
      return "Derecha";
  }
};

export const Carousel = ({ arrows }: CarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll to end when arrows change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [arrows]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="w-full max-w-3xl h-32 overflow-hidden relative cursor-grab active:cursor-grabbing bg-gray-100/5 rounded-xl border border-gray-200/20"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={scrollContainerRef}
        className="flex items-center h-full overflow-x-auto gap-6 px-6 no-scrollbar select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {arrows?.map((arrow, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[80px] gap-2 animate-in fade-in zoom-in duration-300"
          >
            <Arrow direction={arrow} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {getArrowLabel(arrow)}
            </span>
          </div>
        ))}
        {(!arrows || arrows.length === 0) && (
          <div className="w-full text-center text-gray-400 text-sm">
            Presiona las flechas o WASD para comenzar
          </div>
        )}
      </div>
    </div>
  );
};
