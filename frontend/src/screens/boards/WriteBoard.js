import React, { useState, useRef } from "react";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Button } from "../../components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 20px;
  margin-top: -50px;
`;

const WriteBoard = ({ route, navigation }) => {
  const { routeName } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const contentRef = useRef();

  const _handleSubmitButtonPress = () => {
    if (
      routeName == "AnoBoard" ||
      routeName == "FreeBoard" ||
      routeName == "MainBoard"
    ) {
      navigation.replace(routeName);
    } else {
      navigation.replace(routeName, { routeName });
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
        <Button title="작성완료" onPress={_handleSubmitButtonPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default WriteBoard;
