import React, { useContext, useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../contexts";
import { Input, Button } from "../components";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";
import axios from "axios";

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
const ButtonContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: -10px;
  margin-bottom: -10px;
`;
const ButtonBox = styled.View`
  width: 100px;
`;

const UserDetail = () => {
  const { user, dispatch } = useContext(UserContext);
  const { id } = user;
  const [userId, setUserId] = useState(user.userId);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMsg = "";
      if (!username) {
        _errorMsg = "Please enter yout name";
      } else if (!userId) {
        _errorMsg = "Please enter your id";
      } else if (!isChecked) {
        _errorMsg = "Please double check id";
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
      !(
        username &&
        userId &&
        isChecked &&
        password &&
        passwordConfirm &&
        !errorMsg
      ),
    );
  }, [username, userId, password, passwordConfirm, errorMsg]);

  const _handleUpdateButtonPress = async () => {
    axios
      .post("http://10.0.2.2:8000/api/user/update", {
        id,
        userId,
        username,
        password,
      })
      .then((res) => {
        if (res.data.data == 1) {
          dispatch({ userId, username, password, id });
          setPassword("");
          setPasswordConfirm("");
          Alert.alert("수정 완료");
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  const _handleDoubleCheck = () => {
    if (user.userId === userId) {
      Alert.alert("사용 가능한 아이디입니다");
      setIsChecked(true);
    } else {
      axios
        .get("http://10.0.2.2:8000/api/user/doublecheck/" + userId)
        .then((res) => {
          if (res.data.data === 0) {
            Alert.alert("사용 가능한 아이디입니다");
            setIsChecked(true);
          } else {
            Alert.alert("이미 사용중인 아이디입니다");
            setIsChecked(false);
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
