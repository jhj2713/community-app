import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { WriteList, LikeList } from "../screens";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../theme";

const Tab = createMaterialTopTabNavigator();

const OtherUserDetailTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "WriteList") {
            iconName = focused ? "tag" : "tago";
          } else if (route.name === "LikeList") {
            iconName = focused ? "like1" : "like2";
          }

          return (
            <AntDesign name={iconName} size={24} color={theme.iconColor} />
          );
        },
      })}
    >
      <Tab.Screen
        name="WriteList"
        component={WriteList}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="LikeList"
        component={LikeList}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default OtherUserDetailTab;
