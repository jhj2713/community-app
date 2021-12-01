import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import Navigation from "./navigations";
import { theme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
