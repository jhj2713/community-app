import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AnoBoard } from "../screens";

const Stack = createStackNavigator();

const AnoBoardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AnoBoard" component={AnoBoard} />
    </Stack.Navigator>
  );
};

export default AnoBoardStack;
