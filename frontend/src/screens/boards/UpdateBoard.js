import React, { useState, useRef } from "react";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Button } from "../../components";
import { Alert } from "react-native";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  margin-top: -50px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  width: 85%;
  justify-content: center;
  padding: 10px 30px;
`;
const ButtonBox = styled.View`
  width: 150px;
  margin: 0 5px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const UpdateBoard = ({ navigation, route }) => {
  const { routeName, board } = route.params;
  const [title, setTitle] = useState(board.title);
  const [content, setContent] = useState(board.content);
  const [errorText, setErrorText] = useState("");

  const contentRef = useRef();

  const _handleSubmitButtonPress = () => {
    if (title == "" || content == "") {
      setErrorText("Please enter content");
    } else {
      setErrorText("");
      axios
        .post("http://10.0.2.2:8000/api/board/update", {
          id: board.id,
          title,
          content,
        })
        .then((res) => {
          if (routeName === "Free") {
            navigation.replace("FreeBoardDetail", {
              routeName: "Free",
              board: res.data.data,
            });
          } else if (routeName === "Ano") {
            navigation.replace("AnoBoardDetail", {
              routeName: "Ano",
              board: res.data.data,
            });
          } else if (routeName === "Main") {
            navigation.replace("MainBoardDetail", {
              routeName: "Main",
              board: res.data.data,
            });
          } else {
            navigation.replace("GroupBoardDetail", {
              routeName,
              board: res.data.data,
            });
          }
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <Input
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          onSubmitEditing={() => {
            setTitle(title.trim());
            contentRef.current.focus();
          }}
          placeholder="Title"
          returnKeyType="next"
        />
        <Input
          ref={contentRef}
          label="Content"
          value={content}
          onChangeText={(text) => setContent(text)}
          onSubmitEditing={() => setContent(content)}
          placeholder="Content"
          multiline
        />
        <ErrorText>{errorText} </ErrorText>
        <ButtonContainer>
          <ButtonBox>
            <Button title="취소" onPress={() => navigation.goBack()} />
          </ButtonBox>
          <ButtonBox>
            <Button title="수정완료" onPress={_handleSubmitButtonPress} />
          </ButtonBox>
        </ButtonContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default UpdateBoard;
