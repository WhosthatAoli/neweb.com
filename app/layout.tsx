import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Banner from "../components/banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <div className="bg-gradient-to-b from-violet-500 to-fuchsia-500 text-slate-50">
          <Navbar />
          <Banner />
        </div>
        {children}
        <footer>footer</footer>
      </body>
    </html>
  );
}
