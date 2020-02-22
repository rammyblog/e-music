import React from "react";
import { Route, Switch } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./account/Login";
import CustomLayout from "./containers/Layout";
import MusicCard from "./containers/MusicCard";
import UserFavourite from "./containers/UserFavourite";
import SearchResults from './containers/SearchResults';

const BaseRouter = () => (
  <Hoc>
    {/* <Route exact path="/" component={Navbar} /> */}
    <Switch>
      <Route exact path='/login/' component={Login} />
      <Route exact path='/dashboard/' component={MusicCard} />
      <Route exact path='/favourite_songs/' component={UserFavourite} />
      <Route exact path='/search/:search_string' component={SearchResults} />



    </Switch>
  </Hoc>
);

export default BaseRouter;
