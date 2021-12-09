import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStack from "./MainStack";
import FreeBoardStack from "./FreeBoardStack";
import AnoBoardStack from "./AnoBoardStack";
import GroupBoardStack from "./GroupBoardStack";
import { UserContext } from "../contexts";
import { AntDesign } from "@expo/vector-icons";
import { MyDetail } from "../screens";

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  const { user } = useContext(UserContext);

  return (
    <DrawerNavigator.Navigator initialRouteName="메인화면">
      <DrawerNavigator.Screen
        name={user.name}
        component={MyDetail}
        options={{
          drawerIcon: () => (
            <AntDesign name="user" size={24} style={{ marginRight: -20 }} />
          ),
          headerTitle: "내 정보",
        }}
      />
      <DrawerNavigator.Screen name="메인화면" component={MainStack} />
      <DrawerNavigator.Screen name="자유게시판" component={FreeBoardStack} />
      <DrawerNavigator.Screen name="익명게시판" component={AnoBoardStack} />
      <DrawerNavigator.Screen
        name="그룹게시판"
        component={GroupBoardStack}
        options={{ headerShown: false }}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
