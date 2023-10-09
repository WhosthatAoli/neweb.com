import * as React from "react";
import "../globals.css";
import img from "@/app/lib/assets/logo.png";
import MarkButton from "./markButton";

interface CardProps {
  title: string;
  content: string | undefined;
  image: string;
  url: string;
  features: string[];
}

const featureToColor = (feature: string) => {
  const colors: {[key: string]: string} = {
    "Daily Useful": "bg-blue-400",
    "Developer Courses": "bg-red-400",
    "Image Processing": "bg-green-400",
    "DevTools": "bg-yellow-600",
    "Online Streaming": "bg-yellow-300",
    "DIY": "bg-indigo-400",
    "AI": "bg-purple-400",
    "Vedio & Music & Audio": "bg-pink-400",
  };
  return colors[feature] || "bg-gray-400";  // 默认颜色
};

const Card: React.FC<CardProps> = ({
  title,
  content,
  image,
  url,
  features,
}) => {
  return (
    <div className="rounded-lg h-full w-60 sm:w-72 md:w-80 lg:w-96 shadow-md hover:shadow-lg hover:-translate-y-2 transition-transform duration-500">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <img
          className="rounded-t-lg object-cover w-full h-48 sm:h-56 md:h-60 lg:h-64"
          src={image ? image : img.src}
          alt={title}
        />
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg sm:text-xl truncate">
              {title ? title : "Card Title"}
            </div>
            <MarkButton title={title} />
          </div>
          <div className="text-gray-700 text-base mb-4">
            <p className="truncate" title={content ? content : "Card Content"}>
              {content ? content : "Card Content"}
            </p>
          </div>
          <ul className="text-xs flex flex-wrap gap-1.5">
            {features &&
              features.map((feature, index) => (
                <li
                  key={index}
                  className={`mb-1 text-white font-semibold px-2 py-1 rounded-lg ${featureToColor(feature)}`}
                >
                  {feature}
                </li>
              ))}
          </ul>
        </div>
      </a>
    </div>
  );
};

export default Card;
