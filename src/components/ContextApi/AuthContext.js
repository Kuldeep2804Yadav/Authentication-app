import { createContext, useState } from "react";

 export const AuthContext = createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
 });

 export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState('');

    const isLoggedIn = !!token;
    const loginHandler=(token)=>{
        setToken(token)

    }
    const logOutHandler=()=>{
        setToken('');
    }

    const contextValue={
        token:token,
        setToken:setToken,
        isLoggedIn:isLoggedIn,
        logout:logOutHandler,
        login:loginHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )

 }

