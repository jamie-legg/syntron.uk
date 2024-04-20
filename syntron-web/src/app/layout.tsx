

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "./components/Navigation";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="h-full">
      <body className={inter.className + " h-full"}>
      {children}
      </body>
    </html>
  );
}
