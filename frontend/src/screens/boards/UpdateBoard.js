import React, { useState, useRef } from "react";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Button } from "../../components";

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

const UpdateBoard = ({ navigation, route }) => {
  const { routeName } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const contentRef = useRef();

  const _handleSubmitButtonPress = () => {
    if (routeName === "Free") {
      navigation.replace("FreeBoardDetail", { routeName: "Free" });
    } else if (routeName === "Ano") {
      navigation.replace("AnoBoardDetail", { routeName: "Ano" });
    } else if (routeName === "Main") {
      navigation.replace("MainBoardDetail", { routeName: "Main" });
    } else {
      navigation.replace("GroupBoardDetail", {
        routeName,
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
