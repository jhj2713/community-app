import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BoardDetail, MainBoard, UpdateBoard, WriteBoard } from "../screens";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainBoard" component={MainBoard} />
      <Stack.Screen name="MainBoardDetail" component={BoardDetail} />
      <Stack.Screen name="WriteMainBoard" component={WriteBoard} />
      <Stack.Screen name="UpdateMainBoard" component={UpdateBoard} />
    </Stack.Navigator>
  );
};

export default MainStack;
