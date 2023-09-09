'use client';
import * as React from "react";
import "../app/globals.css";
import { banners } from "../constant";
import { features } from "process";
import { categories } from "../constant";
import Navbar from "./navbar";

interface BannerProps {}

const Banner: React.FunctionComponent<BannerProps> = (props) => {

  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(()=>{
    const interval = setInterval(
      ()=>{
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
      }
    , 3000);
    return () => clearInterval(interval);
  }, [])

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
    <div 
      style={{ 
        backgroundImage: `linear-gradient(rgba(214, 214, 214, 0.8), rgba(255, 255, 255)), 
        url(${banners[currentIndex].img})`, 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        overflow: 'auto', 
        // filter: 'blur(4px)'
      }}
    >
       <a
        href={banners[currentIndex].url}
        target="_blank"
        className="w-full"
      >
        <div className="flex flex-col gap-6">
          <Navbar />
          <div className="w-full bg-gray-400 p-8 bg-transparent flex flex-col justify-center gap-10">
            <div className="flex justify-start items-center gap-10">
              {
                categories.map(item => (
                  <div className="font-bold">{item}</div>
                ))
              }
            </div>
            <div className="relative">
              <button className="absolute top-40 -left-5 w-12 h-12 rounded-full bg-[#00000080] text-2xl text-white font-semibold opacity-100 z-10" onClick={handlePrevious}>&lt;</button>
              {
                <div className="relative z-0">
                <img className="w-full h-96 rounded-2xl" src={banners[currentIndex].img} alt={banners[currentIndex].name} />
                <div className="absolute bottom-1/4 left-16 text-white font-semibold">
                  <div className="text-4xl font-bold mb-4">{banners[currentIndex].name}</div>
                  <div>{banners[currentIndex].description}</div>
                </div>
                </div>
              }
              <button className="absolute top-40 -right-5 w-12 h-12 rounded-full bg-[#00000080] text-2xl text-white font-semibold opacity-100 z-10" onClick={handleNext}>&gt;</button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Banner;
