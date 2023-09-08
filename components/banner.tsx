import * as React from "react";
import "../app/globals.css";
import { banners } from "../constant";
import { categories } from "../constant";

interface BannerProps {}

const Banner: React.FunctionComponent<BannerProps> = (props) => {
  return (
    <div>
      <div className="w-full h-40 bg-gray-400 p-14">
        <div className="flex justify-start items-center gap-10">
          {
            categories.map(item => (
              <div>{item}</div>
            ))
          }
        </div>
        {/* {
          banners[0]
        } */}
      </div>
    </div>
  );
};

export default Banner;
