import { createContext, useEffect, useState } from "react";

 export const AuthContext = createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
 });

 export const AuthContextProvider=(props)=>{
    
    const initialToken= localStorage.getItem("token");
    const [token,setToken]=useState(initialToken);

    const isLoggedIn = !!token;
    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem("token",token);

    }
    const logOutHandler=()=>{
        setToken(null);
        
    }
    useEffect(()=>{
        if(initialToken){
            setToken(initialToken);
        }},[initialToken])

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

