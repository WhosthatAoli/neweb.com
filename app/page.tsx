import Image from "next/image";
import Card from "@/components/card";
import img from "../public/images/kenan.jpg";
import { websites, features as allFeatures } from "../constant";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <div>
      <Banner />
      {allFeatures.map((feature) => (
        <div key={feature} className="collection mt-4">
          <div className="text-2xl font-bold mt-4 ml-4 mb-4">{feature}</div>
          <div className="cardBar flex overflow-auto gap-4 pt-4 pb-4 ml-4 mr-4">
            {websites
              .filter((site) => site.feature.includes(feature))
              .map((filteredSite, index) => (
                <Card
                  key={index}
                  title={filteredSite.name}
                  content={filteredSite.description}
                  image={filteredSite.img}
                  url={filteredSite.url}
                  features={filteredSite.feature}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
