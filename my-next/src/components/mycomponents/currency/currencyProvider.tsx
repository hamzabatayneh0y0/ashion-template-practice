"use client";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
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
