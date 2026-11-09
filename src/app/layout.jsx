import "./global.css"; // This injects your Tailwind CSS globally

export const metadata = {
    title: "EDCI Enterprise Hub",
    description: "Empowering student innovation and startup incubation.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased bg-slate-50 text-slate-900 min-h-screen">
                {children}
            </body>
        </html>
    );
}