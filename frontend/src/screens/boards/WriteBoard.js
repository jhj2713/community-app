import React, { useState, useRef, useEffect } from "react";
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
  padding: 0px 20px;
  margin-top: -50px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const WriteBoard = ({ route, navigation }) => {
  const { routeName } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorText, setErrorText] = useState("");
  const [boardId, setBoardId] = useState("");

  const contentRef = useRef();

  useEffect(() => {
    if (routeName == "AnoBoard") {
      setBoardId(1);
    } else if (routeName == "FreeBoard") {
      setBoardId(2);
    } else {
      setBoardId(2 + route.params.category);
    }
  }, []);

  const _handleSubmitButtonPress = async () => {
    if (title == "" || content == "") {
      setErrorText("Please enter content");
    } else {
      setErrorText("");
      axios
        .post("http://10.0.2.2:8000/api/board/save/" + boardId, {
          title,
          content,
        })
        .then((res) => {
          if (boardId > 2) {
            navigation.replace(routeName, {
              routeName,
              category: route.params.category,
            });
          } else {
            navigation.replace(routeName);
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
        <ErrorText>{errorText}</ErrorText>
        <Button title="작성완료" onPress={_handleSubmitButtonPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default WriteBoard;
