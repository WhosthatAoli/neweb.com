import Image from "next/image";
import Card from "@/components/card";
import img from "../public/images/kenan.jpg"


export default function Home() {
  return <div className="cardBar">
    <Card title="manga" content="kenan" image={img.src} />
    <Card title="manga" content="kenan" image={img.src} />
    <Card title="manga" content="kenan" image={img.src} />
    <Card title="manga" content="kenan" image={img.src} />
  </div>;
}
