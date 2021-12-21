import React, { useLayoutEffect, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Pagination, SearchInput } from "../../components";
import { GroupContext } from "../../contexts";
import { AntDesign } from "@expo/vector-icons";
import { Alert, FlatList } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
`;
const GroupBox = styled.TouchableOpacity`
  padding: 40px 0 0 30px;
`;
const GroupText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.groupText};
`;

const GroupSelect = ({ navigation }) => {
  const { groups, deleteGroup } = useContext(GroupContext);
  const [showGroup, setShowGroup] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          name="plus"
          size={24}
          color="black"
          style={{ margin: 10 }}
          onPress={() => navigation.navigate("게시판추가")}
        />
      ),
    });
  });

  useEffect(() => {
    setShowGroup(groups);
  }, [groups]);

  const ItemView = ({ item }) => {
    return (
      <GroupBox
        key={item.id}
        onPress={() =>
          navigation.navigate(item.name, {
            routeName: item.name,
            category: item.id,
          })
        }
        onLongPress={() =>
          Alert.alert(
            "삭제하시겠습니까?",
            null,
            [
              { text: "아니오", style: "cancel" },
              {
                text: "네",
                onPress: () => {
                  deleteGroup(item.name);
                },
              },
            ],
            { cancelable: false },
          )
        }
      >
        <GroupText>{item.name}</GroupText>
      </GroupBox>
    );
  };

  const _handlePrevButtonPress = () => {
    setPageNumber((num) => setPageNumber(num - 1));
  };
  const _handleNextButtonPress = () => {
    setPageNumber((num) => setPageNumber(num + 1));
  };
  const _handleSearchButtonPress = () => {
    if (searchText == "") {
      setShowGroup(groups);
    } else {
      setShowGroup(groups.filter((group) => group.name.includes(searchText)));
    }
  };

  return (
    <Container>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        onPress={_handleSearchButtonPress}
      />
      <FlatList data={showGroup} renderItem={ItemView} />
      <Pagination
        pageNumber={pageNumber}
        lastPage={5}
        prevButtonPress={_handlePrevButtonPress}
        nextButtonPress={_handleNextButtonPress}
      />
    </Container>
  );
};

export default GroupSelect;
