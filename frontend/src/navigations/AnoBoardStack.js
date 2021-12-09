import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AnoBoard, BoardDetail, UpdateBoard, WriteBoard } from "../screens";

const Stack = createStackNavigator();

const AnoBoardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AnoBoard" component={AnoBoard} />
      <Stack.Screen name="AnoBoardDetail" component={BoardDetail} />
      <Stack.Screen name="WriteAnoBoard" component={WriteBoard} />
      <Stack.Screen name="UpdateAnoBoard" component={UpdateBoard} />
    </Stack.Navigator>
  );
};

export default AnoBoardStack;
