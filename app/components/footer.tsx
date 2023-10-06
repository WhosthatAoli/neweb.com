import * as React from "react";
import { logo } from "../lib/assets";

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  return (
    <div id="bottom" className="footer bg-blue-400 flex gap-6 text-white pb-8">
      <div className="about pl-8 pt-8 flex-col  justify-start w-1/4">
        <img
          src={logo.src}
          alt="logo"
          className="w-12 h-12 object-fill rounded-full"
        />
        <p className="text-2xl font-bold pt-3">PocketX</p>
        <p className="pt-3">
          Where Tech, Trends, and Arts Collide! Stay ahead with the latest in
          technology, IT trends, and the vibrant world. Join us in exploring the
          future!
        </p>
      </div>
      <div className="pl-8 pt-8 flex-col  justify-start w-1/4">
        <div className="pl-8 pt-8 text-xl font-bold ">Contact</div>
        <div className="pl-8 pt-4">Contact us at xxxizzle@gmail.com</div>
      </div>
    </div>
  );
};

export default Footer;
