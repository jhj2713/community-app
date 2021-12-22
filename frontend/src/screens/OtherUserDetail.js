import React, { useState, useLayoutEffect, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import { Alert, FlatList } from "react-native";
import axios from "axios";

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

const OtherUserDetail = ({ navigation, route }) => {
  const { user } = route.params;
  const [writeList, setWriteList] = useState([]);

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
  useEffect(() => {
    axios
      .post("http://10.0.2.2:8000/api/board/loadBoards", user)
      .then((res) => {
        setWriteList(res.data.data);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  }, []);

  return (
    <Container>
      <UserBox>
        <AntDesign name="user" size={50} />
        <StyledText>{user.userId}</StyledText>
        <StyledText>{user.username}</StyledText>
      </UserBox>
      <BoardsContainer>
        <FlatList data={writeList} renderItem={ItemView} />
      </BoardsContainer>
    </Container>
  );
};

export default OtherUserDetail;
