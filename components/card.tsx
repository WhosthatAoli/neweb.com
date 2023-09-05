import * as React from "react";
import "../app/globals.css";
import img from "../public/images/image_1.jpg";

interface CardProps {
  title: string;
  content: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, content, image }) => {
  return (
    <div className="cardContainer rounded-lg">
      {image ? (
        <img className="rounded-lg" src={image} alt={title} />
      ) : (
        <img src={img.src} alt={title} />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {title ? title : "Card Title"}
        </div>
        <p className="text-gray-700 text-base">
          {content ? content : "Card Content"}
        </p>
      </div>
    </div>
  );
};

export default Card;
