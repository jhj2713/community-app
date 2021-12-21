import React, { useState, createContext } from "react";

const UserContext = createContext({
  user: { username: null, id: null },
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({ userId, username, password, id }) => {
    setUser({ userId, username, password, id });
  };
  const value = { user, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
