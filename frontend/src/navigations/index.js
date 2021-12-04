import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import Drawer from "./Drawer";
import { UserContext } from "../contexts";

const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {user?.uid && user?.name ? <Drawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
