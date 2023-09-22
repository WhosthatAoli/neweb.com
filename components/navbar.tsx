import * as React from "react";
import "../app/globals.css";
import { logo } from "../assets";
import { useContext } from "react";
import { MyContext } from "./context";
import { useRouter } from "next/navigation";

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const { isLogin, setIsLogin } = useContext(MyContext);
  const router = useRouter();
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
          <div
            onClick={() => {
              router.push("/");
            }}
            className="text-xl cursor-pointer"
          >
            Home
          </div>
          {/* <a href="/Home/web3" className="text-xl">
            Web3
          </a>
          <a href="/Home/gamefiHub" className="text-xl">
            GameFiHub
          </a> */}
          {/* <a href="/AddNewWebInfo" className="text-xl">
            AddNewWebInfo
          </a> */}
          <div
            className="cursor-pointer text-xl"
            onClick={() => {
              router.push("/AddNewWebInfo");
            }}
          >
            AddNewWebInfo
          </div>
          <div
            onClick={() => {
              router.push("/test");
            }}
            className="text-xl cursor-pointer"
          >
            test
          </div>
        </div>
        {!isLogin ? (
          <div className="flex flex-row items-center gap-4 pr-6">
            <div
              onClick={() => {
                router.push("/Login");
              }}
              className="cursor-pointer"
            >
              Login
            </div>
            <div
              onClick={() => {
                router.push("/Register");
              }}
              className="cursor-pointer"
            >
              Register
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-4 pr-6">
            <div
              onClick={() => {
                setIsLogin(false);
                router.push("/");
              }}
              className=""
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
