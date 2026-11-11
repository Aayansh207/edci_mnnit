
import "./global.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "EDCI Enterprise Hub",
  description: "Empowering student innovation and startup incubation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-slate-900 min-h-screen font-sans">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
