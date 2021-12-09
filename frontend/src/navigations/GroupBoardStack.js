import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  GroupBoard,
  GroupSelect,
  WriteGroup,
  WriteBoard,
  BoardDetail,
  OtherUserDetail,
  UpdateBoard,
} from "../screens";
import { GroupContext } from "../contexts";

const Stack = createStackNavigator();

const GroupBoardStack = () => {
  const { groups } = useContext(GroupContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="게시판선택" component={GroupSelect} />
      <Stack.Screen name="게시판추가" component={WriteGroup} />
      {groups.map((group) => (
        <Stack.Screen key={group.id} name={group.name} component={GroupBoard} />
      ))}
      <Stack.Screen
        name="GroupBoardDetail"
        component={BoardDetail}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="WriteGroupBoard"
        component={WriteBoard}
        options={{ headerTitle: "게시글 작성" }}
      />
      <Stack.Screen
        name="UpdateGroupBoard"
        component={UpdateBoard}
        options={{ headerTitle: "게시글 수정" }}
      />
      <Stack.Screen name="OtherUserDetail" component={OtherUserDetail} />
    </Stack.Navigator>
  );
};

export default GroupBoardStack;
