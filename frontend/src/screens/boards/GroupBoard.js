import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Alert, FlatList } from "react-native";
import { Button, SearchInput, Pagination } from "../../components";
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
const ButtonBox = styled.View`
  position: absolute;
  right: 20px;
  bottom: 20px;
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

const GroupBoard = ({ route, navigation }) => {
  const { routeName, category } = route.params;
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [boards, setBoards] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  const _handleSearchButtonPress = () => {
    if (searchText === "") {
      axios
        .get(
          `http://10.0.2.2:8000/api/board/groupboards/${category}?page=${
            pageNumber - 1
          }&size=${pageSize}&sort=id,DESC`,
        )
        .then((res) => {
          const data = res.data.data;
          if (data.totalElements == 0) {
            setLastPage(1);
          } else {
            setLastPage(Math.floor((data.totalElements - 1) / data.size) + 1);
          }
          setBoards(data.content);
        })
        .catch((err) => {
          Alert.alert(err.messsage);
        });
    } else {
      axios
        .get(
          `http://10.0.2.2:8000/api/board/groupboard/${category}/${searchText}?page=${
            pageNumber - 1
          }&size=${pageSize}&sort=id,DESC`,
        )
        .then((res) => {
          const data = res.data.data;
          if (data.totalElements == 0) {
            setLastPage(1);
          } else {
            setLastPage(Math.floor((data.totalElements - 1) / data.size) + 1);
          }
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
    return (
      <BoardBox
        key={item.id}
        onPress={() =>
          navigation.navigate("GroupBoardDetail", { routeName, board: item })
        }
        onLayout={_handleItem}
      >
        <BoardTitle>{item.title}</BoardTitle>
        <BoardUser>{item.user.username}</BoardUser>
      </BoardBox>
    );
  };

  const _handleLayout = (e) => {
    setLayoutHeight(e.nativeEvent.layout.height);
  };
  const _handleItem = (e) => {
    setItemHeight(e.nativeEvent.layout.height);
  };
  useEffect(() => {
    if (!pageSize || pageSize === Infinity || pageSize === 0) {
      setPageSize(Math.floor(layoutHeight / itemHeight));
    }
  }, [layoutHeight, itemHeight]);
  useEffect(() => {
    axios
      .get(
        `http://10.0.2.2:8000/api/board/groupboards/${category}?page=${
          pageNumber - 1
        }&size=${pageSize}&sort=id,DESC`,
      )
      .then((res) => {
        const data = res.data.data;
        setLastPage(Math.floor((data.totalElements - 1) / data.size) + 1);
        setBoards(data.content);
      })
      .catch((err) => {
        Alert.alert(err.messsage);
      });
  }, [pageNumber, pageSize]);
  useEffect(() => {
    axios
      .get(
        `http://10.0.2.2:8000/api/board/groupboards/${category}?page=${
          pageNumber - 1
        }&size=${pageSize}&sort=id,DESC`,
      )
      .then((res) => {
        const data = res.data.data;
        setLastPage(Math.floor((data.totalElements - 1) / data.size) + 1);
        setBoards(data.content);
      })
      .catch((err) => {
        Alert.alert(err.messsage);
      });
  });

  return (
    <Container>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        onPress={_handleSearchButtonPress}
      />
      <BoardsContainer onLayout={_handleLayout}>
        <FlatList data={boards} renderItem={ItemView} />
      </BoardsContainer>
      <Pagination
        lastPage={lastPage}
        pageNumber={pageNumber}
        prevButtonPress={_handlePrevButtonPress}
        nextButtonPress={_handleNextButtonPress}
      />
      <ButtonBox>
        <Button
          title="+"
          onPress={() => {
            navigation.navigate("WriteGroupBoard", {
              routeName,
              category,
            });
          }}
          isRound
        />
      </ButtonBox>
    </Container>
  );
};

export default GroupBoard;
