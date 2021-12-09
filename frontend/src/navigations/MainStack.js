import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainBoard } from "../screens";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainBoard" component={MainBoard} />
    </Stack.Navigator>
  );
};

export default MainStack;
