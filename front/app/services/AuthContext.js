import React, { createContext, useState, useEffect, useContext } from "react";
import { saveTokens, getAccessToken, clearTokens } from "./secureStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedToken = await getAccessToken();
      if (storedToken) setUserToken(storedToken);
      setIsLoading(false);
    })();
  }, []);

  const login = async (access, refresh) => {
    await saveTokens(access, refresh);
    setUserToken(access);
  };

  const logout = async () => {
    await clearTokens();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
