import React, { useRef, useState, useEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
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
  const [user, setUser] = useState({
    userId: "",
    username: "",
    password: "",
  });
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
      if (!user.username) {
        _errorMsg = "Please enter yout name";
      } else if (!user.userId) {
        _errorMsg = "Please enter your id";
      } else if (user.password.length < 6) {
        _errorMsg = "Password must contain 6 character at least";
      } else if (user.password !== passwordConfirm) {
        _errorMsg = "Passwords need to match";
      } else {
        _errorMsg = "";
      }
      setErrorMsg(_errorMsg);
    } else {
      didMountRef.current = true;
    }
  }, [user.username, user.userId, user.password, passwordConfirm]);
  useEffect(() => {
    setDisabled(
      !(
        user.username &&
        user.userId &&
        user.password &&
        passwordConfirm &&
        !errorMsg
      ),
    );
  }, [user.username, user.userId, user.password, passwordConfirm, errorMsg]);

  const _handleSignupButtonPress = async () => {
    axios
      .post("http://10.0.2.2:8000/api/user/signup", user)
      .then((res) => {
        Alert.alert("회원가입이 완료되었습니다", "로그인을 진행해주세요");
        navigation.navigate("Login");
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  const _handleDoubleCheck = () => {};

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          label="Name"
          value={user.username}
          onChangeText={(text) => setUser({ ...user, username: text })}
          onSubmitEditing={() => {
            setUser({ ...user, username: user.username.trim() });
            IdRef.current.focus();
          }}
          onBlur={() => setUser({ ...user, username: user.username.trim() })}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          ref={IdRef}
          label="Id"
          value={user.userId}
          onChangeText={(text) => setUser({ ...user, userId: text })}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          onBlur={() => setUser({ ...user, userId: user.userId.trim() })}
          placeholder="Id"
          returnKeyType="next"
        />
        <ButtonContainer>
          <ButtonBox>
            <Button
              title="중복확인"
              onPress={_handleDoubleCheck}
              disabled={user.userId === ""}
              isFilled={false}
            />
          </ButtonBox>
        </ButtonContainer>
        <Input
          ref={passwordRef}
          label="Password"
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          onSubmitEditing={() => {
            passwordConfirmRef.current.focus();
          }}
          onBlur={() => setUser({ ...user, password: user.password.trim() })}
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
