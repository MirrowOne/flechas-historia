"use client";
import { Arrow } from "@/components/Arrow";
import { Carousel } from "@/components/Carousel";
import { useActionDetector } from "@/hooks/useActionDetector";

export default function Home() {
  const { action: direction, arrows, clearArrows } = useActionDetector();

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
    <div className="flex justify-center items-center h-screen bg-background text-foreground">
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl px-4">
        {/* Top Panel: Carousel */}
        <section className="w-full flex justify-center">
          <Carousel arrows={arrows} />
        </section>

        {/* Main Action Display */}
        <div className="flex flex-col items-center gap-4">
          <div className="scale-150 p-4">
            <Arrow direction={direction} />
          </div>
          <p className="text-2xl font-bold uppercase tracking-widest opacity-80">
            {getMessage()}
          </p>
        </div>

        {/* Controls */}
        <button
          className="px-6 py-2 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity active:scale-95"
          onClick={clearArrows}
        >
          Limpiar Historial
        </button>
      </div>
    </div>
  );
}
