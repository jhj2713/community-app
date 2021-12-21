import React, { useState, useEffect } from "react";
import { Button, SearchInput, Pagination } from "../../components";
import styled from "styled-components";
import { Alert, FlatList } from "react-native";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
`;
const BoardsContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 20px;
`;
const BoardBox = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderBottom};
`;
const ButtonBox = styled.View`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;
const BoardTitle = styled.Text`
  font-size: 20px;
  padding: 20px 15px;
`;
const BoardUser = styled.Text`
  font-size: 15px;
  padding: 20px 15px;
`;

const FreeBoard = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [boards, setBoards] = useState([]);

  const _handleSearchBtnPress = () => {
    Alert.alert("검색");
  };
  const _handlePrevButtonPress = () => {
    setPageNumber((num) => setPageNumber(num - 1));
  };
  const _handleNextButtonPress = () => {
    setPageNumber((num) => setPageNumber(num + 1));
  };

  const ItemView = ({ item }) => {
    return (
      <BoardBox
        key={item.id}
        onPress={() => {
          navigation.navigate("FreeBoardDetail", { routeName: "Free" });
        }}
      >
        <BoardTitle>{item.title}</BoardTitle>
        <BoardUser>유저명</BoardUser>
      </BoardBox>
    );
  };

  useEffect(() => {
    axios
      .get(
        `http://10.0.2.2:8000/api/board/freeboards?page=${
          pageNumber - 1
        }&size=7&sort=id,DESC`,
      )
      .then((res) => {
        setBoards(res.data.data.content);
      })
      .catch((err) => {
        Alert.alert(err.messsage);
      });
  }, [pageNumber]);

  return (
    <Container>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        onPress={_handleSearchBtnPress}
      />
      <BoardsContainer>
        <FlatList data={boards} renderItem={ItemView} />
      </BoardsContainer>
      <Pagination
        lastPage={10}
        pageNumber={pageNumber}
        prevButtonPress={_handlePrevButtonPress}
        nextButtonPress={_handleNextButtonPress}
      />
      <ButtonBox>
        <Button
          title="+"
          onPress={() => {
            navigation.navigate("WriteFreeBoard", { routeName: "FreeBoard" });
          }}
          isRound
        />
      </ButtonBox>
    </Container>
  );
};

export default FreeBoard;
