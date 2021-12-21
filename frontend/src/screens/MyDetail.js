import React, { useContext, useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../contexts";
import { Input, Button } from "../components";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.background};
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const UserDetail = () => {
  const { user, dispatch } = useContext(UserContext);
  const { uid } = user;
  const [userId, setUserId] = useState(user.userId);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);

  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMsg = "";
      if (!name) {
        _errorMsg = "Please enter yout name";
      } else if (!userId) {
        _errorMsg = "Please enter your id";
      } else if (password.length < 6) {
        _errorMsg = "Password must contain 6 character at least";
      } else if (password !== passwordConfirm) {
        _errorMsg = "Passwords need to match";
      } else {
        _errorMsg = "";
      }
      setErrorMsg(_errorMsg);
    } else {
      didMountRef.current = true;
    }
  }, [username, userId, password, passwordConfirm]);
  useEffect(() => {
    setDisabled(
      !(username && userId && password && passwordConfirm && !errorMsg),
    );
  }, [username, userId, password, passwordConfirm, errorMsg]);

  const _handleUpdateButtonPress = () => {
    Alert.alert("수정 완료");
    dispatch({ userId, username, password, uid });
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <AntDesign name="user" size={50} />
        <Input
          label="Id"
          value={userId}
          onChangeText={(text) => setUserId(text)}
          onSubmitEditing={() => nameRef.current.focus()}
          onBlur={() => setUserId(userId.trim())}
          placeholder="Id"
          returnKeyType="next"
        />
        <Input
          ref={nameRef}
          label="Name"
          value={username}
          onChangeText={(text) => setUsername(text)}
          onSubmitEditing={() => passwordRef.current.focus()}
          onBlur={() => setUsername(username.trim())}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          onBlur={() => setPassword(password.trim())}
          placeholder="Password"
          returnKeyType="next"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="PasswordConfirm"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
          onSubmitEditing={_handleUpdateButtonPress}
          onBlur={() => setPasswordConfirm(passwordConfirm.trim())}
          placeholder="PasswordConfirm"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMsg}</ErrorText>
        <Button
          title="수정완료"
          onPress={_handleUpdateButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default UserDetail;
