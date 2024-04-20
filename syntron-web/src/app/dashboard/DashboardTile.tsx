import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

export const DashboardTile = ({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) => {
  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const calculateRotation = (
    rect: DOMRect,
    mouseX: number,
    mouseY: number,
    maxAngle: number = 15
  ) => {
    const xRot = clamp(
      -2 * ((mouseY - (rect.top + rect.height / 2)) / rect.height),
      -maxAngle,
      maxAngle
    );
    const yRot = clamp(
      2 * ((mouseX - (rect.left + rect.width / 2)) / rect.width),
      -maxAngle,
      maxAngle
    );
    return `perspective(500px) rotateX(${xRot}deg) rotateY(${yRot}deg)`;
  };

  const calculateShadow = (
    rect: DOMRect,
    mouseX: number,
    mouseY: number,
    maxOffset: number = 10
  ) => {
    const xOffset =
      maxOffset * ((mouseX - (rect.left + rect.width / 2)) / rect.width);
    const yOffset =
      maxOffset * ((mouseY - (rect.top + rect.height / 2)) / rect.height);
    return `${xOffset}px ${yOffset}px 15px rgba(0, 0, 0, 0.1)`;
  };

  const useMousePositionEffect = (ref: React.RefObject<HTMLDivElement>) => {
    const [style, setStyle] = useState<{ transform: string }>({
      transform: "",
    });

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const newTransform = calculateRotation(
            rect,
            event.clientX,
            event.clientY
          );
          const newShadow = calculateShadow(rect, event.clientX, event.clientY);
          setStyle({
            transform: newTransform,
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [ref]);

    return style;
  };
  const ref = useRef<HTMLDivElement>(null);
  const style = useMousePositionEffect(ref);

  return (
    <Link href={href}>
      <div
        className={`${active? 'text-sky-200 border-sky-200 border-opacity-100' : 'text-sky-500 border-sky-400 border-opacity-40'} shadow-lg relative overflow-hidden bg-opacity-30 border-b 
   hover:text-sky-200 hover:border-sky-200 
           transition-all duration-200 cursor-pointer w-full px-4 py-2 border-svg tracking-widest
      `}
        style={{ transform: style.transform }}
      >
        <div
          className="flex justify-start place-content-center items-center font-bold text-sm uppercase "
        >
          {children}
        </div>
      </div>
    </Link>
  );
};
