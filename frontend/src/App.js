import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import Navigation from "./navigations";
import { theme } from "./theme";
import { UserProvider } from "./contexts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
