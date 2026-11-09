import PublicNavbar from "@/components/layout/public-navbar";


export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <PublicNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}