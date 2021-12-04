import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStack from "./MainStack";
import FreeBoardStack from "./FreeBoardStack";
import AnoBoardStack from "./AnoBoardStack";
import GroupBoardStack from "./GroupBoardStack";

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator initialRouteName="메인화면">
      <DrawerNavigator.Screen name="메인화면" component={MainStack} />
      <DrawerNavigator.Screen name="자유게시판" component={FreeBoardStack} />
      <DrawerNavigator.Screen name="익명게시판" component={AnoBoardStack} />
      <DrawerNavigator.Screen name="그룹게시판" component={GroupBoardStack} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
