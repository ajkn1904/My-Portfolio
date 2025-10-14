// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";


export const metadata: Metadata = {
  title: "Portfolio | Anika Jumana Khanam",
  description: "Portfolio Website by Anika Jumana Khanam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100 text-gray-900">
        <Navbar />
        <main className="ml-[90px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
