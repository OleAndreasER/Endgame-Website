import "./cycle.css";

interface Props {
  items: string[];
  activeItemIndex: number;
  setActiveItemIndex: (index: number) => void;
  itemWidth: number;
  activeItemColor: string;
}

export function Cycle({
  items,
  activeItemIndex,
  itemWidth,
  setActiveItemIndex,
  activeItemColor,
}: Props) {
  return (
    <div style={{ width: `${itemWidth * items.length}px` }} className="cycle">
      {items.map((item, i) =>
        i === activeItemIndex ? (
          <div
            key={i}
            style={{
              width: `${itemWidth}px`,
              backgroundColor: activeItemColor,
              color: "var(--background-color)",
            }}
            className="cycle-item"
          >
            {item}
          </div>
        ) : (
          <div
            key={i}
            style={{ width: `${itemWidth}px` }}
            onClick={() => setActiveItemIndex(i)}
            className="cycle-item"
          >
            {item}
          </div>
        )
      )}
    </div>
  );
}
