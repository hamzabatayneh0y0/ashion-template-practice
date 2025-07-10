"use client";
import { useEffect, useState } from "react";

export default function NewCard({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const [render, setRender] = useState(false);
  const [show1, setshow1] = useState(false);

  useEffect(() => {
    if (show) {
      setRender(true);
      const timeout = setTimeout(() => setshow1(true), 10);

      return () => clearTimeout(timeout);
    } else {
      setshow1(false);
      const timeout = setTimeout(() => {
        setRender(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <div
      className={`card transition-all duration-300 ease-in-out  ${
        show1 ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } ${render ? "block" : "hidden"}`}
    >
      {children}
    </div>
  );
}
