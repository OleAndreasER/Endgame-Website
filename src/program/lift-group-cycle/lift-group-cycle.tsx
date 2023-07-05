import "./lift-group-cycle.css";

interface Props {
  items: string[];
  itemWidth: number;
  backgroundColor: string;
}

export function LiftGroupCycle({ items, itemWidth, backgroundColor }: Props) {
  return (
    <div
      style={{ width: `${itemWidth * items.length}px` }}
      className="lift-group-cycle"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="lift-group-cycle-item"
          style={{ width: `${itemWidth}px`, backgroundColor }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
