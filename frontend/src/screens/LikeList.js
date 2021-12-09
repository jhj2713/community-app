import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";

const BoardsContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.background};
`;
const BoardBox = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderBottom};
`;
const BoardTitle = styled.Text`
  font-size: 20px;
  padding: 20px 15px;
`;

const LikeList = ({ navigation }) => {
  const [likeList, setLikeList] = useState([
    { id: 1, title: "제목1" },
    { id: 2, title: "제목2" },
    { id: 3, title: "제목3" },
    { id: 4, title: "제목4" },
    { id: 5, title: "제목5" },
    { id: 6, title: "제목6" },
    { id: 7, title: "제목7" },
  ]);

  const ItemView = ({ item }) => {
    return (
      <BoardBox
        key={item.id}
        onPress={() => navigation.navigate("FreeBoard", { name: "Free" })}
      >
        <BoardTitle>{item.title}</BoardTitle>
      </BoardBox>
    );
  };
  return (
    <BoardsContainer>
      <FlatList data={likeList} renderItem={ItemView} />
    </BoardsContainer>
  );
};

export default LikeList;
