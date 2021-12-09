import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BoardDetail,
  FreeBoard,
  OtherUserDetail,
  UpdateBoard,
  WriteBoard,
} from "../screens";

const Stack = createStackNavigator();

const FreeBoardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FreeBoard" component={FreeBoard} />
      <Stack.Screen name="FreeBoardDetail" component={BoardDetail} />
      <Stack.Screen name="WriteFreeBoard" component={WriteBoard} />
      <Stack.Screen name="UpdateFreeBoard" component={UpdateBoard} />
      <Stack.Screen name="OtherUserDetail" component={OtherUserDetail} />
    </Stack.Navigator>
  );
};

export default FreeBoardStack;
