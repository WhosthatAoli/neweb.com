import { web3, web3_features as allFeatures } from "../../constant";
import Card from "../../components/card";

export default function Home() {
  return (
    <div>
      {allFeatures.map((feature) => (
        <div key={feature} className="collection mt-4">
          <div className="text-2xl font-bold mt-4 ml-6 mb-4">{feature}</div>
          <div className="cardBar flex overflow-auto gap-4 pt-4 pb-4 ml-6 mr-4">
            {web3
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
