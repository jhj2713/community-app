import React, { useState, createContext } from "react";

const GroupContext = createContext({
  groups: [],
});

const GroupProvider = ({ children }) => {
  const [id, setId] = useState(3);
  const [groups, setGroups] = useState([
    { id: 1, name: "컴퓨터" },
    { id: 2, name: "미술" },
  ]);
  const dispatch = (name) => {
    setGroups([...groups, { id: id, name: name }]);
    setId((prevId) => prevId + 1);
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
