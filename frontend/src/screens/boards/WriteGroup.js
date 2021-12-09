import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button, Input } from "../../components";
import { GroupContext } from "../../contexts";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  margin-top: -100px;
`;

const WriteGroup = ({ navigation }) => {
  const [group, setGroup] = useState("");

  const { dispatch } = useContext(GroupContext);

  const _handleSubmitButtonPress = () => {
    dispatch(group);
    navigation.navigate("게시판선택");
  };

  return (
    <Container>
      <Input
        label="게시판명"
        value={group}
        onChangeText={(text) => setGroup(text)}
        placeholder="추가할 게시판 이름을 입력해주세요"
        onSubmitEditing={_handleSubmitButtonPress}
        returnKeyType="done"
      />
      <Button title="추가" onPress={_handleSubmitButtonPress} />
    </Container>
  );
};

export default WriteGroup;
