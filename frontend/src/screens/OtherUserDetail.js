import React, { useState, useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import { FlatList } from "react-native";

const Container = styled.View`
  height: 100%;
`;
const UserBox = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderBottom};
`;
const StyledText = styled.Text`
  font-size: 20px;
`;
const MessageBox = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;
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

const OtherUserDetail = ({ navigation }) => {
  const [user, setUser] = useState({ userId: "user", name: "name" });
  const [writeList, setWriteList] = useState([
    { id: 1, title: "제목1" },
    { id: 2, title: "제목2" },
    { id: 3, title: "제목3" },
    { id: 4, title: "제목4" },
    { id: 5, title: "제목5" },
    { id: 6, title: "제목6" },
    { id: 7, title: "제목7" },
    { id: 8, title: "제목7" },
    { id: 9, title: "제목7" },
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  });

  const _handleChattingButtonPress = () => {};

  return (
    <Container>
      <UserBox>
        <MessageBox onPress={_handleChattingButtonPress}>
          <AntDesign name="message1" size={24} color="black" />
        </MessageBox>
        <AntDesign name="user" size={50} />
        <StyledText>{user.userId}</StyledText>
        <StyledText>{user.name}</StyledText>
      </UserBox>
      <BoardsContainer>
        <FlatList data={writeList} renderItem={ItemView} />
      </BoardsContainer>
    </Container>
  );
};

export default OtherUserDetail;
