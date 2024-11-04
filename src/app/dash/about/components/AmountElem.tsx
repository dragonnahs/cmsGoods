'use client';

import { useEffect, useState } from 'react';
export default function AmountElem() {
  const eles = new Array(10).fill(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const idleRender = (current: number) => {
    if (current < eles.length) {
      setCurrentIndex((prev) => prev + 1);
      window.requestAnimationFrame(() => {
        idleRender(current + 1);
      });
    }
  };

  useEffect(() => {
    idleRender(0);
  }, []);
  return (
    <div className="flex items-center mt-2 mb-2 flex-wrap gap-5">
      {eles.map((_, index) => {
        return index < currentIndex ? (
          <div className="w-56 h-20 bg-red-500" key={index}>
            aaa {currentIndex}
          </div>
        ) : null;
      })}
    </div>
  );
}
