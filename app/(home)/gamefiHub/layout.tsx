import "../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../../components/navbar";
import Banner from "../../components/banner";

const inter = Inter({ subsets: ["latin"] });

export default function Web3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
