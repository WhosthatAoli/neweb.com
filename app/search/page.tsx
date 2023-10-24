"use client";

import React from "react";
import Card from "../components/card";
import Banner from "../components/banner";
import { getAllWebsiteData } from "../api/firebaseApi/firebaseFunc";
import { useSearchParams } from "next/navigation";

export default async function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase();

  const websites = await getAllWebsiteData();
  console.log("params", search);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search Results:</h1>
      <div className="cardBar flex overflow-auto gap-4 pt-4 pb-4 ml-6 mr-4">
        {websites
          .filter((web) => {
            return web.name.toLowerCase().includes(search);
          })
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
  );
}
