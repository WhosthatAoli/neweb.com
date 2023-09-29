"use client";

import React, { createContext, useState, useEffect } from "react";

// Create a context

const MyContext = createContext({
  isLogin: false,
  setIsLogin: (value: boolean) => {},
  user: null,
  setUser: (value: any) => {},
});

// Create a provider component
function MyContextProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  //next.js 一定会先执行serverside，然后才会执行client side，所以就算是在client component里面，也要在useeffect里面使用localstorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")!);
    if (savedUser) {
      setUser(savedUser);
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")!);
    //如果有user，login是false，就把user刪掉, 如果沒有user，login是true，就把user存進去
    if (savedUser) {
      if (!isLogin) {
        localStorage.removeItem("user");
      }
    } else {
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  }, [isLogin]);

  const contextValue = {
    isLogin,
    setIsLogin,
    user,
    setUser,
  };

  console.log("context", contextValue);

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
