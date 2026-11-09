import "./global.css";

export const metadata = {
  title: "EDCI - MNNIT Allahabad",
  description: "Entrepreneurship Development and Collaboration Initiative, MNNIT Allahabad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

