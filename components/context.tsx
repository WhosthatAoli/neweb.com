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
