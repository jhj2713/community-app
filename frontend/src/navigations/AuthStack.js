import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
