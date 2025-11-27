import "./arrow.css";

export const Arrow = ({ direction }: { direction: ArrowDirections }) => {
  return (
    <div className={`arrow-container ${direction}`}>
      <header className="arrowhead"></header>
      <main className="arrowbody"></main>
    </div>
  );
};
