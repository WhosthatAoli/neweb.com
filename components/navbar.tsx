import * as React from "react";
import "../app/globals.css";
import { logo } from "../assets";

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  return (
    <nav>
      <div className="flex flex-row justify-between font-bold mt-4 text-white">
        <div className="flex flex-row items-center gap-6 pl-6">
          <img
            src={logo.src}
            alt="logo"
            className="w-9 h-9 object-fill rounded-full"
          />
          <a href="/" className="text-xl">
            Home
          </a>
          <a href="/Home/web3" className="text-xl">
            Web3
          </a>
          <a href="/Home/gamefiHub" className="text-xl">
            GameFiHub
          </a>
          <a href="/AddNewWebInfo" className="text-xl">
            AddNewWebInfo
          </a>
        </div>
        <div className="flex flex-row items-center gap-4 pr-6">
          <a href="#" className="">
            Login
          </a>
          <a href="#" className="">
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
