import { features as allFeatures } from "./lib/constant";
import Card from "./components/card";
import { GetWebsites } from "../api/route";
import Banner from "./components/banner";

export default async function Home() {
  const Websites = await GetWebsites();
  console.log(typeof [...Websites.rows]);
  console.log(typeof Websites.rows);
  const websites = [...Websites.rows];

  return (
    <div>
      <Banner />
      {allFeatures.map((feature) => (
        <div key={feature} className="collection mt-12">
          <div className="text-2xl font-bold mt-2 ml-6 mb-2">{feature}</div>
          <div className="cardBar flex overflow-auto gap-4 pt-4 pb-4 ml-6 mr-4">
            {websites
              .filter((site) => site.feature?.split(",").includes(feature))
              .map((filteredSite, index) => (
                <Card
                  key={index}
                  title={filteredSite.name}
                  content={filteredSite.description}
                  image={filteredSite.img}
                  url={filteredSite.url}
                  features={filteredSite.feature.split(",")}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
