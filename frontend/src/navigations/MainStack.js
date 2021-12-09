import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BoardDetail, MainBoard } from "../screens";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainBoard" component={MainBoard} />
      <Stack.Screen name="MainBoardDetail" component={BoardDetail} />
    </Stack.Navigator>
  );
};

export default MainStack;
