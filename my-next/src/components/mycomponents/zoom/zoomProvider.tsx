"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface ZoomType {
  open: { img: string; display: boolean };
  setOpen: Dispatch<SetStateAction<{ img: string; display: boolean }>>;
}
export const zoomContext = createContext<ZoomType>({
  open: { img: "", display: false },
  setOpen: () => {},
});

export default function ZoomProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState({ img: "", display: false });
  return (
    <zoomContext.Provider value={{ open, setOpen }}>
      {children}
    </zoomContext.Provider>
  );
}
export function useZoom() {
  const { open, setOpen } = useContext(zoomContext);
  return { open, setOpen };
}
