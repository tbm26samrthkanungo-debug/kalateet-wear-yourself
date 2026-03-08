import { ReactNode, useEffect, useRef, useState, useMemo } from "react";

interface MasonryGridProps {
  children: ReactNode[];
  columns?: number;
  mobileColumns?: number;
  gap?: number;
  className?: string;
}

// Height weight estimates for balancing columns
const heightWeights: Record<string, number> = {
  short: 3,
  medium: 4,
  tall: 5,
};

const MasonryGrid = ({ children, columns = 4, mobileColumns = 1, gap = 20, className = "" }: MasonryGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [colCount, setColCount] = useState(columns);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColCount(mobileColumns);
      else if (width < 768) setColCount(Math.min(2, columns));
      else if (width < 1024) setColCount(Math.min(3, columns));
      else setColCount(columns);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columns, mobileColumns]);

  // Distribute children into shortest column first for balanced layout
  const columnArrays = useMemo(() => {
    const cols: ReactNode[][] = Array.from({ length: colCount }, () => []);
    const colHeights: number[] = new Array(colCount).fill(0);

    children.forEach((child) => {
      // Find the shortest column
      let minIdx = 0;
      for (let i = 1; i < colCount; i++) {
        if (colHeights[i] < colHeights[minIdx]) minIdx = i;
      }
      cols[minIdx].push(child);

      // Estimate height from the child's props if available
      let weight = 4; // default medium
      if (child && typeof child === "object" && "props" in child) {
        const cardData = (child as any).props?.card;
        if (cardData?.height && heightWeights[cardData.height]) {
          weight = heightWeights[cardData.height];
        }
      }
      colHeights[minIdx] += weight;
    });

    return cols;
  }, [children, colCount]);

  return (
    <div
      ref={containerRef}
      className={`flex ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnArrays.map((col, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col flex-1 min-w-0"
          style={{ gap: `${gap}px` }}
        >
          {col.map((child, childIndex) => (
            <div key={childIndex} className="animate-fade-in" style={{ animationDelay: `${(colIndex + childIndex * colCount) * 60}ms` }}>
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
