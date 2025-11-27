"use client";
import { Arrow } from "@/components/Arrow";
import { Carousel } from "@/components/Carousel";
import { useActionDetector } from "@/hooks/useActionDetector";

export default function Home() {
  const { realAction, arrows, clearArrows, isReverse, toggleReverse } =
    useActionDetector();

  const getMessage = () => {
    switch (realAction) {
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
            <Arrow direction={realAction} />
          </div>
          <p className="text-2xl font-bold uppercase tracking-widest opacity-80">
            {getMessage()}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center">
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all active:scale-95 border-2 ${
              isReverse
                ? "bg-red-500 text-white border-red-500"
                : "bg-transparent text-foreground border-foreground hover:bg-foreground/5"
            }`}
            onClick={toggleReverse}
          >
            Modo Inverso: {isReverse ? "ON" : "OFF"}
          </button>
          <button
            className="px-6 py-2 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity active:scale-95 border-2 border-transparent"
            onClick={clearArrows}
          >
            Limpiar Historial
          </button>
        </div>
      </div>
    </div>
  );
}
