import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syntron",
  description:
    "Your one-stop shop for all things Armagetron Advanced. Downlaod the game, get help, view the leaderboards, contribute to the community, and more!",
  icons: [
    {
      url: "/favicon.ico",
    },
  ],
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
        
        <SpeedInsights />
      </body>
    </html>
  );
}
