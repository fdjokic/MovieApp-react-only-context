import React from "react";
import { Switch, Route } from "react-router-dom";
import Error from "./Error";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Tree from "./Tree";
import SingleMovie from "./SingleMovie";
import NavBar from "./NavBar";
import { lightTheme, darkTheme } from "./themes";
import { useGlobalContext } from "./context";
import { ThemeProvider } from "styled-components";
import SidebarCategories from "./SidebarCategories";
import Footer from "./Footer.js";

function App() {
  const location = useLocation();
  const { theme } = useGlobalContext();

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <NavBar />
        <SidebarCategories />

        <AnimatePresence exitBeforeEnter>
          <Switch key={location.pathname} location={location}>
            <Route exact path="/">
              <Tree />
            </Route>
            <Route path="/movies/:id" children={<SingleMovie />} />
            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <Footer />
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
