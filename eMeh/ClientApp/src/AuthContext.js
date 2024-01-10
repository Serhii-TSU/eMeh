import React, { createContext, useState, useContext } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiVersion, setApiVersion] = useState('1');


  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const v1 = () => {
    setApiVersion('1');debugger
  };

  const v2 = () => {
    setApiVersion('2');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, apiVersion, v1, v2, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
