import React, { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialExpirationTime = localStorage.getItem("expirationTime");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; 
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = expirationTime - new Date().getTime();
    setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (initialToken && initialExpirationTime) {
      const remainingTime = new Date(parseInt(initialExpirationTime, 10)).getTime() - new Date().getTime();
      if (remainingTime <= 0) {
        logoutHandler();
      } else {
        setTimeout(logoutHandler, remainingTime);
      }
    }
  }, [initialToken, initialExpirationTime, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setToken:setToken
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
