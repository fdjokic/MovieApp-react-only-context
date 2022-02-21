import React from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";

const App = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
