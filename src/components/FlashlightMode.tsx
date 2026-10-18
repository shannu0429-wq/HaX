import React, { useEffect, useState } from 'react';

interface FlashlightModeProps {
  isActive: boolean;
}

export const FlashlightMode: React.FC<FlashlightModeProps> = ({ isActive }) => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!isActive) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
      setPos({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle 220px at ${pos.x}px ${pos.y}px, rgba(0,0,0,0) 0%, rgba(6, 8, 20, 0.6) 80%, rgba(6, 8, 20, 0.88) 100%)`,
      }}
    >
      {/* Secret Star Runes illuminated inside the lantern beam */}
      <div
        className="absolute w-12 h-12 text-amber-200 text-2xl font-bold flex items-center justify-center -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none animate-pulse"
        style={{ left: pos.x, top: pos.y }}
      >
        ✨
      </div>
    </div>
  );
};
