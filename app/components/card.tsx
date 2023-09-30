import * as React from "react";
import "../globals.css";
import img from "@/app/lib/assets/logo.png";

interface CardProps {
  title: string;
  content: string | undefined;
  image: string;
  url: string;
  features: string[];
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  image,
  url,
  features,
}) => {
  return (
    <div className="rounded-lg w-80 shadow-lg hover:shadow-xl hover:-translate-y-2 duration-500">
      <a href={url} target="_blank" rel="noopener noreferrer" className="w-80">
        <img
          className="rounded-lg object-cover w-80 h-60"
          src={image ? image : img.src}
          alt={title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {title ? title : "Card Title"}
          </div>
          <div className="text-gray-700 text-base">
            <p>
              {content ? content : "Card Content"}
              {/* {content ? content.substring(0, 70) + '...' : "Card Content"} */}
            </p>
          </div>
          <ul className="mt-4 text-xs flex gap-1.5">
            {features &&
              features.map((feature, index) => (
                <li
                  key={index}
                  className="mb-1 text-white font-semibold bg-blue-400 px-4 py-2 rounded-lg"
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
