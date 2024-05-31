import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./_components/_layout/AppRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asset Scan",
  description: "Asset Scan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" title="111">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
