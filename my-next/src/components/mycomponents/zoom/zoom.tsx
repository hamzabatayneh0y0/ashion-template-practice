"use client";
import { useEffect } from "react";
import { useZoom } from "./zoomProvider";
import style from "./zoom.module.css";
import Image from "next/image";
export default function Zoom() {
  const { open, setOpen } = useZoom();
  function handleZoom() {
    setOpen({ ...open, display: false });
  }

  useEffect(() => {
    if (open.display) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      onClick={handleZoom}
      className={`zoom fixed z-[900] top-0 left-0 w-full h-full flex justify-center items-center scale-0 ${
        style.shadow
      } transition-all ${
        open.display ? " scale-100 opacity-100" : " opacity-0"
      }`}
    >
      <Image
        src={open.img == "" ? "/next.svg" : open.img}
        alt="product image"
        loading="lazy"
        width={300}
        height={300}
        style={{ height: "auto", width: "auto" }}
        className="relative z-[999] "
      />
    </div>
  );
}
