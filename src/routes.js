import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import Navbar from "./containers/Navbar";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Navbar} />
  </Hoc>
);

export default BaseRouter;
