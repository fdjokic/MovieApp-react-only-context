import React from "react";
import { Switch, Route } from "react-router-dom";
import Error from "./Error";
import Movie from "./Movie";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Tree from "./Tree";
import SingleMovie from "./SingleMovie";
import NavBar from "./NavBar";

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
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
      </AnimatePresence>
    </>
  );
}
export default App;
