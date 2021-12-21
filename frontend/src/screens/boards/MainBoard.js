import React, { useState, useEffect } from "react";
import { SearchInput, Pagination } from "../../components";
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
  const [lastPage, setLastPage] = useState(1);
  const [boards, setBoards] = useState([]);

  const _handleSearchBtnPress = () => {
    if (searchText === "") {
      axios
        .get(
          `http://10.0.2.2:8000/api/board/mainboards?page=${
            pageNumber - 1
          }&size=7&sort=id,DESC`,
        )
        .then((res) => {
          const data = res.data.data;
          setLastPage(Math.floor((data.totalElements - 1) / data.size) + 1);
          setBoards(data.content);
        })
        .catch((err) => {
          Alert.alert(err.messsage);
        });
    } else {
      axios
        .get(
          `http://10.0.2.2:8000/api/board/mainboard/${searchText}?page=${
            pageNumber - 1
          }&size=7&sort=id,DESC`,
        )
        .then((res) => {
          const data = res.data.data;
          setLastPage(Math.floor((data.totalElements - 1) / data.size) + 1);
          setBoards(data.content);
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    }
  };
  const _handlePrevButtonPress = () => {
    setPageNumber((num) => setPageNumber(num - 1));
  };
  const _handleNextButtonPress = () => {
    setPageNumber((num) => setPageNumber(num + 1));
  };

  const ItemView = ({ item }) => {
    if (item.boardId === 1) {
      return (
        <BoardBox
          key={item.id}
          onPress={() => {
            navigation.navigate("MainBoardDetail", {
              routeName: "Main",
              board: item,
            });
          }}
        >
          <BoardTitle>{item.title}</BoardTitle>
        </BoardBox>
      );
    } else {
      return (
        <BoardBox
          key={item.id}
          onPress={() => {
            navigation.navigate("MainBoardDetail", {
              routeName: "Main",
              board: item,
            });
          }}
        >
          <BoardTitle>{item.title}</BoardTitle>
          <BoardUser>유저명</BoardUser>
        </BoardBox>
      );
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://10.0.2.2:8000/api/board/mainboards?page=${
          pageNumber - 1
        }&size=7&sort=id,DESC`,
      )
      .then((res) => {
        const data = res.data.data;
        setLastPage(Math.floor((data.totalElements - 1) / data.size) + 1);
        setBoards(data.content);
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
        lastPage={lastPage}
        pageNumber={pageNumber}
        prevButtonPress={_handlePrevButtonPress}
        nextButtonPress={_handleNextButtonPress}
      />
    </Container>
  );
};

export default MainBoard;
