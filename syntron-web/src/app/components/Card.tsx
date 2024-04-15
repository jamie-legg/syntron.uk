

import React, { useRef, useState, useEffect } from "react";

export const Card = ({ children }: {
    children: React.ReactNode;
}) => {
  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  // Function to calculate rotation based on mouse position, with max rotation limits
  const calculateRotation = (
    rect: DOMRect,
    mouseX: number,
    mouseY: number,
    maxAngle: number = 15
  ) => {
    // Reverse the direction of rotation by switching the sign of the calculated rotation
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

  // Function to calculate shadow based on mouse position
  const calculateShadow = (
    rect: DOMRect,
    mouseX: number,
    mouseY: number,
    maxOffset: number = 10
  ) => {
    const xOffset =(
      maxOffset * ((mouseX - (rect.left + rect.width / 2)) / rect.width)
    );
    const yOffset = (
      maxOffset * ((mouseY - (rect.top + rect.height / 2)) / rect.height)
    );
    return `${xOffset}px ${yOffset}px 15px rgba(0, 0, 0, 0.1)`;
  };

  const useMousePositionEffect = (ref: React.RefObject<HTMLDivElement>) => {
    const [style, setStyle] = useState<{ transform: string, boxShadow: string }>({
      transform: '',
      boxShadow: ''
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
          const newShadow = calculateShadow(
            rect,
            event.clientX,
            event.clientY
          );
          setStyle({
            transform: newTransform,
            boxShadow: newShadow
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
  const color = "red";

  return (
    <div
      className={`bg-slate-900 to-indigo-500 h-full w-full rounded-lg shadow-lg relative overflow-hidden bg-opacity-85 text-sky-400 border-4 border-sky-400
           transition-all duration-200
      `}
      style={{ transform: style.transform, textShadow: style.boxShadow }}
    >
    <div className="w-full h-full flex justify-center place-content-center items-center font-bold 

    text-xl
    ">
    {children}
    </div>
    </div>
  );
};
