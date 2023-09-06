import Image from "next/image";
import Card from "@/components/card";
import img from "../public/images/kenan.jpg";
import { websites } from "../constant";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="collection bg-slate-300 mt-4">
        <div className="text-2xl pl-6">DevTools</div>
        <div className="cardBar flex justify-between pl-4 pr-4">
          <Card title="manga" content="kenan" image={img.src} />
          <Card title="manga" content="kenan" image={img.src} />
          <Card title="manga" content="kenan" image={img.src} />
          <Card title="manga" content="kenan" image={img.src} />
        </div>
      </div>

      <div className="collection bg-slate-300 mt-4">
        <div className="text-2xl pl-6">Image Processing</div>
        <div className="cardBar flex justify-between pl-4 pr-4">
          <Card title="manga" content="kenan" image={img.src} />
          <Card title="manga" content="kenan" image={img.src} />
          <Card title="manga" content="kenan" image={img.src} />
          <Card title="manga" content="kenan" image={img.src} />
        </div>
      </div>
    </div>
  );
}
