import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FreeBoard } from "../screens";

const Stack = createStackNavigator();

const FreeBoardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FreeBoard" component={FreeBoard} />
    </Stack.Navigator>
  );
};

export default FreeBoardStack;
