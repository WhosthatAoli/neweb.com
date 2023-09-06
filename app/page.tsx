import Image from "next/image";
import Card from "@/components/card";
import img from "../public/images/kenan.jpg";
import { websites, features as allFeatures  } from "../constant";
import Banner from "@/components/banner";


export default function Home() {
  
  return (
    <div>
      <Banner />
      {allFeatures.map(feature => (
        <div key={feature} className="collection bg-slate-300 mt-4">
          <div className="text-2xl pl-6">{feature}</div>
          <div className="cardBar flex  pl-4 pr-4">
            {websites.filter(site => site.feature.includes(feature)).map((filteredSite, index) => (
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
