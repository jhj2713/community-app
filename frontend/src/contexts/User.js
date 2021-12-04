import React, { useState, createContext } from "react";

const UserContext = createContext({
  user: { name: null, uid: null },
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({ userId, name, password, uid }) => {
    setUser({ userId, name, password, uid });
  };
  const value = { user, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
