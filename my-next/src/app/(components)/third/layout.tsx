import { Metadata } from "next";


// app/login/layout.tsx
export const metadata: Metadata = {
  title: "third",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <div className="">
        {/* بدون Navbar هون */}
        {children}
    </div>
  );
}

