import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input, Button } from "../components";
import { UserContext } from "../contexts";
import axios from "axios";
import { Alert } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const Login = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const pwdRef = useRef();
  const insets = useSafeAreaInsets();

  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    console.log("login");
  }, []);
  useEffect(() => {
    setDisabled(!(userId && password));
  }, [password]);

  const _handleUserIdChange = (userId) => {
    setUserId(userId);
  };
  const _handlePwdChange = (password) => {
    setPassword(password);
  };
  const _handleLoginButtonPress = async () => {
    axios
      .post("http://10.0.2.2:8000/api/user/login", { userId, password })
      .then((res) => {
        if (res.data.data == 0) {
          Alert.alert("로그인 정보가 틀렸습니다");
        } else {
          const user = res.data.data;
          dispatch(user);
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Input
          label="Id"
          value={userId}
          onChangeText={_handleUserIdChange}
          onSubmitEditing={() => pwdRef.current.focus()}
          onBlur={() => setUserId(userId.trim())}
          placeholder="Id"
          returnKeyType="next"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={_handlePwdChange}
          onSubmitEditing={_handleLoginButtonPress}
          onBlur={() => setPassword(password.trim())}
          placeholder="Password"
          returnKeyType="done"
          ref={pwdRef}
          isPassword
        />
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up"
          onPress={() => navigation.navigate("Signup")}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
