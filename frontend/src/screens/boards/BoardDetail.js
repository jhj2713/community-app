import React, { useState } from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { Button } from "../../components";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const Title = styled.Text`
  padding: 30px;
  font-size: 25px;
`;
const Content = styled.Text`
  padding: 0 0 30px 30px;
  font-size: 20px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;
const ButtonBox = styled.View`
  flex: 1;
  width: 150px;
  margin: 0 5px;
`;
const BoardHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const BoardUser = styled.TouchableOpacity`
  padding: 30px;
`;
const UserName = styled.Text`
  font-size: 17px;
`;
const CategoryText = styled.Text`
  padding: 30px 0 0 30px;
  font-size: 17px;
  color: ${({ theme }) => theme.categoryText};
`;
const Board = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderBottom};
`;
const CommentContainer = styled.View`
  flex: 1;
`;
const Comment = styled.View`
  padding: 30px 30px 10px 30px;
  flex-direction: row;
  justify-content: space-between;
`;
const CommentContent = styled.Text`
  font-size: 20px;
`;
const CommentUser = styled.TouchableOpacity``;

const BoardDetail = ({ navigation, route }) => {
  const { routeName } = route.params;
  const [comments, setComments] = useState([
    { id: 1, content: "댓글댓글1", user: "user1" },
    { id: 2, content: "댓글댓글2", user: "user2" },
    { id: 3, content: "댓글댓글3", user: "user3" },
    { id: 4, content: "댓글댓글4", user: "user4" },
    { id: 5, content: "댓글댓글5", user: "user5" },
    { id: 6, content: "댓글댓글6", user: "user6" },
    { id: 7, content: "댓글댓글7", user: "user7" },
  ]);

  const ItemView = ({ item }) => {
    return (
      <Comment>
        <CommentContent>{item.content}</CommentContent>
        {routeName === "Ano" || (
          <CommentUser onPress={() => {}}>
            <UserName>{item.user}</UserName>
          </CommentUser>
        )}
      </Comment>
    );
  };

  const _handleUpdateButtonPress = () => {
    if (routeName === "Free") {
      navigation.navigate("UpdateFreeBoard", { routeName });
    } else if (routeName === "Ano") {
      navigation.navigate("UpdateAnoBoard", { routeName });
    } else if (routeName === "Main") {
      navigation.navigate("UpdateMainBoard", { routeName });
    } else {
      navigation.navigate("UpdateGroupBoard", {
        routeName: "GroupBoardDetail",
      });
    }
  };
  const _handleDeleteButtonPress = () => {
    if (routeName === "Free") {
      navigation.navigate("FreeBoard");
    } else if (routeName === "Ano") {
      navigation.navigate("AnoBoard");
    } else if (routeName === "Main") {
      navigation.navigate("MainBoard");
    } else {
      navigation.navigate("GroupBoard");
    }
  };

  return (
    <Container>
      {routeName === "Main" && <CategoryText>자유게시판</CategoryText>}
      <Board>
        <BoardHeader>
          <Title>제목</Title>
          {routeName === "Ano" || (
            <BoardUser onPress={() => {}}>
              <UserName>user</UserName>
            </BoardUser>
          )}
        </BoardHeader>
        <Content>내용내용</Content>
      </Board>
      <CommentContainer>
        <FlatList data={comments} renderItem={ItemView} />
      </CommentContainer>
      <ButtonContainer>
        <ButtonBox>
          <Button title="수정" onPress={_handleUpdateButtonPress} />
        </ButtonBox>
        <ButtonBox>
          <Button
            title="삭제"
            onPress={_handleDeleteButtonPress}
            isFilled={false}
          />
        </ButtonBox>
      </ButtonContainer>
    </Container>
  );
};

export default BoardDetail;
