export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
              <h1 className="text-4xl font-bold mb-6 text-center">Hi</h1>

      {children}
    </div>
  );
}