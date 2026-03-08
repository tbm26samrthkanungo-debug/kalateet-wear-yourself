import { ReactNode, useEffect, useRef, useState } from "react";

interface MasonryGridProps {
  children: ReactNode[];
  columns?: number;
  mobileColumns?: number;
  gap?: number;
  className?: string;
}

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

  // Distribute children into columns
  const columnArrays: ReactNode[][] = Array.from({ length: colCount }, () => []);
  children.forEach((child, index) => {
    columnArrays[index % colCount].push(child);
  });

  return (
    <div
      ref={containerRef}
      className={`flex ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnArrays.map((col, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col flex-1"
          style={{ gap: `${gap}px` }}
        >
          {col.map((child, childIndex) => (
            <div key={childIndex} className="animate-fade-in" style={{ animationDelay: `${(colIndex * col.length + childIndex) * 80}ms` }}>
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
