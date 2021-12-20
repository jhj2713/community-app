import React, { useRef, useState, useEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input } from "../components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px 85px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;
const ButtonContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: -10px;
  margin-bottom: -10px;
`;
const ButtonBox = styled.View`
  width: 100px;
`;

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);

  const IdRef = useRef();
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
  }, [name, userId, password, passwordConfirm]);
  useEffect(() => {
    setDisabled(!(name && userId && password && passwordConfirm && !errorMsg));
  }, [name, userId, password, passwordConfirm, errorMsg]);

  const _handleSignupButtonPress = () => {
    Alert.alert("회원가입이 완료되었습니다", "로그인을 진행해주세요");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            IdRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          ref={IdRef}
          label="Id"
          value={userId}
          onChangeText={(text) => setUserId(text)}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          onBlur={() => setUserId(userId.trim())}
          placeholder="Id"
          returnKeyType="next"
        />
        <ButtonContainer>
          <ButtonBox>
            <Button
              title="중복확인"
              onPress={() => Alert.alert("중복확인")}
              disabled={userId === ""}
              isFilled={false}
            />
          </ButtonBox>
        </ButtonContainer>
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => {
            passwordConfirmRef.current.focus();
          }}
          onBlur={() => setPassword(password.trim())}
          placeholder="Password"
          returnKeyType="next"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
          onSubmitEditing={_handleSignupButtonPress}
          onBlur={() => setPasswordConfirm(passwordConfirm.trim())}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMsg}</ErrorText>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
