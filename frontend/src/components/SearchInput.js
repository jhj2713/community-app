import React from "react";
import Input from "./Input";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

const SearchBox = styled.View`
  padding: 0 20px;
  flex-direction: row;
`;
const IconBox = styled.TouchableOpacity`
  padding: 38px 0 0 10px;
`;
const InputBox = styled.View`
  width: 90%;
`;

const SearchInput = ({ searchText, setSearchText, onPress }) => {
  return (
    <SearchBox>
      <InputBox>
        <Input
          label=""
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder="검색어를 입력해주세요"
          onSubmitEditing={onPress}
          returnKeyType="done"
        />
      </InputBox>
      <IconBox onPress={onPress}>
        <AntDesign name="search1" size={35} color="black" />
      </IconBox>
    </SearchBox>
  );
};

export default SearchInput;
