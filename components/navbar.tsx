import * as React from "react";
import "../app/globals.css";
import { logo } from "../assets";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <nav>
      <div className="flex flex-row justify-between font-bold">
        <div className="flex flex-row items-center gap-6">
          <img
            src={logo.src}
            alt="logo"
            className="w-9 h-9 object-fill rounded-full"
          />
          <a href="#" className="">
            Home
          </a>
          <a href="#" className="">
            About
          </a>
          <a href="#" className="">
            Contact
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

export default App;
