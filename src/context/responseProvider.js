// context/ResponseContext.js
// context/LightCalculatorContext.js
import React, { createContext, useState } from "react";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [result, setResult] = useState(null);

  return (
    <UserProfileContext.Provider value={{ result, setResult }}>
      {children}
    </UserProfileContext.Provider>
  );
};
