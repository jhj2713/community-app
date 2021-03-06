import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import Navigation from "./navigations";
import { theme } from "./theme";
import { GroupProvider, UserProvider } from "./contexts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <GroupProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </GroupProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
