import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academic Priority Tracker",
  description: "Track and prioritize your academic tasks over secondary activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
