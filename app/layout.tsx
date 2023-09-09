import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "neweb",
  description: "This is neweb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col gap-6`}>
        {/* <Navbar /> */}
        <Banner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
