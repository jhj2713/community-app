import React, { useState, createContext } from "react";
import axios from "axios";

const GroupContext = createContext({
  groups: [],
});

const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const dispatch = () => {
    axios
      .get("http://10.0.2.2:8000/api/categories")
      .then((res) => {
        setGroups(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const deleteGroup = (name) => {
    setGroups(groups.filter((group) => group.name !== name));
  };
  const value = { groups, dispatch, deleteGroup };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };
