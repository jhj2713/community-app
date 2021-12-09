import React, { useState, useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import OtherUserDetailTab from "../navigations/OtherUserDetailTab";

const Container = styled.View`
  height: 100%;
`;
const UserBox = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderBottom};
`;
const StyledText = styled.Text`
  font-size: 20px;
`;
const MessageBox = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const OtherUserDetail = ({ navigation }) => {
  const [user, setUser] = useState({ userId: "user", name: "name" });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  });

  const _handleChattingButtonPress = () => {};

  return (
    <Container>
      <UserBox>
        <MessageBox onPress={_handleChattingButtonPress}>
          <AntDesign name="message1" size={24} color="black" />
        </MessageBox>
        <AntDesign name="user" size={50} />
        <StyledText>{user.userId}</StyledText>
        <StyledText>{user.name}</StyledText>
      </UserBox>
      <OtherUserDetailTab />
    </Container>
  );
};

export default OtherUserDetail;
