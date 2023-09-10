import * as React from "react";
import "../app/globals.css";
import img from "../public/images/image_1.jpg";

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
          <p className="text-gray-700 text-base w-80">
            {content ? content : "Card Content"}
          </p>
          <ul className="mt-2 text-sm text-gray-600">
            {features &&
              features.map((feature, index) => (
                <li key={index} className="mb-1">
                  • {feature}
                </li>
              ))}
          </ul>
        </div>
      </a>
    </div>
  );
};

export default Card;
