import * as React from "react";
import "../app/globals.css";
import { logo } from "../assets";
import { useContext } from "react";
import { MyContext } from "./context";

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const { isLogin, setIsLogin } = useContext(MyContext);
  console.log(isLogin);

  return (
    <nav>
      <div className="flex flex-row justify-between font-bold mt-4 text-white">
        <div className="flex flex-row items-center gap-6 pl-6">
          <a href="/" className="">
            <img
              src={logo.src}
              alt="logo"
              className="w-9 h-9 object-fill rounded-full"
            />
          </a>
          <a href="/" className="text-xl">
            Home
          </a>
          {/* <a href="/Home/web3" className="text-xl">
            Web3
          </a>
          <a href="/Home/gamefiHub" className="text-xl">
            GameFiHub
          </a> */}
          <a href="/AddNewWebInfo" className="text-xl">
            AddNewWebInfo
          </a>
          <a href="/test" className="text-xl">
            test
          </a>
        </div>
        {!isLogin ? (
          <div className="flex flex-row items-center gap-4 pr-6">
            <a href="/Login" className="">
              Login
            </a>
            <a href="/Register" className="">
              Register
            </a>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-4 pr-6">
            <a
              href="/Login"
              onClick={() => {
                setIsLogin(false);
              }}
              className=""
            >
              Log out
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
