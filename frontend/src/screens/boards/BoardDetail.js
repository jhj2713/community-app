import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Alert, FlatList } from "react-native";
import { Button, Input } from "../../components";
import { UserContext } from "../../contexts";
import axios from "axios";

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
const CommentInputBox = styled.View`
  width: 300px;
  margin: -10px 20px;
`;
const CommentBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const CommentButtonBox = styled.View`
  margin: 25px 20px 0 0;
`;
const CommentUser = styled.TouchableOpacity``;

const BoardDetail = ({ navigation, route }) => {
  const { routeName, board } = route.params;
  const [boardTitle, setBoardTitle] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { user } = useContext(UserContext);

  const ItemView = ({ item }) => {
    return (
      <Comment>
        <CommentContent>{item.content}</CommentContent>
        {routeName === "Ano" || board.boardId === 1 || (
          <CommentUser
            onPress={() => {
              navigation.navigate("OtherUserDetail", { user: item.user });
            }}
          >
            <UserName>{item.user.username}</UserName>
          </CommentUser>
        )}
      </Comment>
    );
  };

  const _handleUpdateButtonPress = () => {
    if (routeName === "Free") {
      navigation.navigate("UpdateFreeBoard", { routeName, board });
    } else if (routeName === "Ano") {
      navigation.navigate("UpdateAnoBoard", { routeName, board });
    } else if (routeName === "Main") {
      navigation.navigate("UpdateMainBoard", { routeName, board });
    } else {
      navigation.navigate("UpdateGroupBoard", {
        routeName,
        board,
      });
    }
  };
  const _handleDeleteButtonPress = () => {
    axios
      .post("http://10.0.2.2:8000/api/board/delete", board)
      .then((res) => {
        if (routeName === "Free") {
          navigation.navigate("FreeBoard");
        } else if (routeName === "Ano") {
          navigation.navigate("AnoBoard");
        } else if (routeName === "Main") {
          navigation.navigate("MainBoard");
        } else {
          navigation.navigate(routeName, { routeName });
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  const _handleCommentButtonPress = () => {
    axios
      .post("http://10.0.2.2:8000/api/comment/save", { comment, board, user })
      .then((res) => {
        setComment("");
        _loadComments();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const _loadComments = () => {
    axios
      .get("http://10.0.2.2:8000/api/comment/load/" + board.id)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    _loadComments();
    if (board.boardId === 1) {
      setBoardTitle("익명게시판");
    } else if (board.boardId === 2) {
      setBoardTitle("자유게시판");
    } else {
      setBoardTitle("그룹게시판");
    }
  }, []);

  return (
    <Container>
      {routeName === "Main" && <CategoryText>{boardTitle}</CategoryText>}
      <Board>
        <BoardHeader>
          <Title>{board.title}</Title>
          {routeName === "Ano" || board.boardId === 1 || (
            <BoardUser
              onPress={() => {
                navigation.navigate("OtherUserDetail", { user: board.user });
              }}
            >
              <UserName>{board.user.username}</UserName>
            </BoardUser>
          )}
        </BoardHeader>
        <Content>{board.content}</Content>
      </Board>
      <CommentContainer>
        <CommentBox>
          <CommentInputBox>
            <Input
              label=""
              value={comment}
              onChangeText={(text) => setComment(text)}
              onSubmitEditing={() => {
                setComment(comment.trim());
              }}
              placeholder="Comment"
              returnKeyType="next"
            />
          </CommentInputBox>
          <CommentButtonBox>
            <Button
              title="제출"
              onPress={_handleCommentButtonPress}
              isFilled={false}
            />
          </CommentButtonBox>
        </CommentBox>
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
