export const metadata = {
  title: 'EDCI MNNIT - Application & Backend Portal',
  description: 'Entrepreneurship Development & Innovation Center - MNNIT Allahabad',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}

