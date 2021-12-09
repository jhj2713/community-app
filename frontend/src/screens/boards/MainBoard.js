import React, { useState } from "react";
import { Button, SearchInput, Pagination } from "../../components";
import styled from "styled-components";
import { Alert, FlatList } from "react-native";

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

const MainBoard = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [titles, setTitles] = useState([
    { id: 1, name: "제목1", user: "user" },
    { id: 2, name: "제목2", user: "user" },
    { id: 3, name: "제목3", user: "user" },
    { id: 4, name: "제목4", user: "user" },
    { id: 5, name: "제목5", user: "user" },
    { id: 6, name: "제목6", user: "user" },
    { id: 7, name: "제목7", user: "user" },
  ]);

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
      <BoardBox key={item.id} onPress={() => {}}>
        <BoardTitle>{item.name}</BoardTitle>
        <BoardUser>{item.user}</BoardUser>
      </BoardBox>
    );
  };

  return (
    <Container>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        onPress={_handleSearchBtnPress}
      />
      <BoardsContainer>
        <FlatList data={titles} renderItem={ItemView} />
      </BoardsContainer>
      <Pagination
        lastPage={10}
        pageNumber={pageNumber}
        prevButtonPress={_handlePrevButtonPress}
        nextButtonPress={_handleNextButtonPress}
      />
      <ButtonBox>
        <Button title="+" onPress={() => {}} isRound />
      </ButtonBox>
    </Container>
  );
};

export default MainBoard;
