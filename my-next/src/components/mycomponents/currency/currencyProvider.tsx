"use client";
import changeCur from "@/functoins/changeCur";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

interface CurrencyContextType {
  cur: string;
  setCur: Dispatch<SetStateAction<string>>;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  cur: "",
  setCur: () => {},
});

export default function CurrencyProvider({
  c,
  children,
}: {
  c: string;
  children: ReactNode;
}) {
  const [cur, setCur] = useState(c);
  useEffect(() => {
    if (cur == "") return;
    const storedcur = localStorage.getItem("currency");
    if (storedcur) {
      changeCur(storedcur);
      localStorage.setItem("currency", storedcur);
      setCur(storedcur);
    } else {
      changeCur(c);
      localStorage.setItem("currency", c);
    }
  }, []);
  return (
    <CurrencyContext.Provider value={{ cur, setCur }}>
      {children}
    </CurrencyContext.Provider>
  );
}
export function useCur() {
  const { cur, setCur } = useContext(CurrencyContext);
  return { cur, setCur };
}
