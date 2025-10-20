import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "react-hot-toast";


const titilliumWeb = Titillium_Web({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anika Jumana Khanam Nishat",
  description: "My personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={titilliumWeb.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
             {children}
          </ThemeProvider>
        
      </body>
    </html>
  );
}
