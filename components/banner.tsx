'use client';
import * as React from "react";
import "../app/globals.css";
import { banners } from "../constant";
import { features } from "process";
import { categories } from "../constant";

interface BannerProps {}

const Banner: React.FunctionComponent<BannerProps> = (props) => {

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }

  return (
    <div>
      <div className="w-full bg-gray-400 p-8 bg-transparent flex flex-col justify-center gap-10">
        <div className="flex justify-start items-center gap-10">
          {
            categories.map(item => (
              <div className="font-bold">{item}</div>
            ))
          }
        </div>
        <div className="relative">
          <button className="absolute top-1/2 -left-5 w-10 h-10 rounded-full bg-[#00000080] text-white font-semibold opacity-100 z-10" onClick={handlePrevious}>&lt;</button>
          {
            <div className="relative z-0">
            <img className="w-full h-96 rounded-2xl" src={banners[currentIndex].img} alt={banners[currentIndex].name} />
            <div className="absolute bottom-1/4 left-10 text-white font-semibold">
              <div className="text-4xl font-bold mb-4">{banners[currentIndex].name}</div>
              <div>{banners[currentIndex].description}</div>
            </div>
            </div>
          }
          <button className="absolute top-1/2 -right-5 w-10 h-10 rounded-full bg-[#00000080] text-white font-semibold opacity-100 z-10" onClick={handleNext}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
