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
    <div className="rounded-lg w-80 min-w-fit">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <img
          className="rounded-lg object-cover w-80 h-60"
          src={image ? image : img.src}
          alt={title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {title ? title : "Card Title"}
          </div>
          <p className="text-gray-700 text-base">
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
