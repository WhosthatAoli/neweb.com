"use client";
import * as React from "react";
import "../globals.css";
import { banners } from "../lib/constant";
import { features } from "process";
import { bannerCategories } from "../lib/constant";
import Navbar from "./navbar";

interface BannerProps {}

const Banner: React.FunctionComponent<BannerProps> = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFolded, setIsFolded] = React.useState(false);

  console.log(banners[currentIndex].img.default.src);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [banners.length, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFold = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsFolded(!isFolded);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(175, 175, 175, 0.8), rgba(255, 255, 255)), 
        url(${banners[currentIndex].img.default.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        overflow: "auto",
        // filter: 'blur(4px)'
      }}
    >
      <div className="flex flex-col gap-6">
        <Navbar />
        {!isFolded ? (
          <div className="w-full bg-gray-400 p-8 bg-transparent flex flex-col justify-center gap-10">
            {/* <div className="flex justify-start items-center gap-10 text-white">
            {bannerCategories.map((item, index) => (
              <div key={index} className="font-bold">
                {item}
              </div>
            ))}
          </div> */}
            <div className="relative group">
              <button
                className="absolute top-40 -left-5 w-12 h-12 rounded-full bg-[#00000080] text-2xl text-white font-semibold z-10 opacity-0 group-hover:opacity-100 shadow-md transition duration-300 ease-in-out"
                onClick={handlePrevious}
              >
                &lt;
              </button>

              <a
                href={banners[currentIndex].url}
                target="_blank"
                className="w-full"
              >
                <div className="relative z-0">
                  <img
                    className="w-full aspect-w-16 aspect-h-9 rounded-2xl object-fill hover:ease-out"
                    src={banners[currentIndex].img.default.src}
                    alt={banners[currentIndex].name}
                  />
                  <div className="absolute bottom-1/4 left-16 text-white font-semibold">
                    <div className="text-4xl font-bold mb-4">
                      {banners[currentIndex].name}
                    </div>
                    <div>{banners[currentIndex].description}</div>
                  </div>
                </div>
              </a>
              <div
                className="w-full h-6 bg-gray-400 text-white font-bold flex justify-center items-center cursor-pointer"
                onClick={handleFold}
              >
                {isFolded ? "Show Banner" : "Hide Banner"}
              </div>

              <button
                className="absolute top-40 -right-5 w-12 h-12 rounded-full bg-[#00000080] text-2xl text-white font-semibold z-10 opacity-0 group-hover:opacity-100 shadow-md transition duration-300 ease-in-out"
                onClick={handleNext}
              >
                &gt;
              </button>
            </div>
          </div>
        ) : (
          <div
            className="w-full h-6 bg-gray-400 text-white font-bold flex justify-center items-center cursor-pointer"
            onClick={handleFold}
          >
            {isFolded ? "Show Banner" : "Hide Banner"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
