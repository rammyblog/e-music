import React from "react";
import { Route, Switch } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./account/Login";
import Signup from "./account/Signup";
import ForgotPassword from "./account/ForgotPassword";
import ResetPasswordConfirm from './account/ResetPasswordConfirm';
import ForgotPasswordConfirmed from './account/ForgotPasswordConfirmed';

import MusicCard from "./containers/MusicCard";
import UserFavourite from "./containers/UserFavourite";
import SearchResults from './containers/SearchResults';

const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route exact path='/login/' component={Login} />
      <Route exact path='/signup/' component={Signup} />
      <Route exact path='/forgot-password/' component={ForgotPassword} />
      <Route exact path='/reset-password/:uid/:token/' component={ResetPasswordConfirm} />
      <Route exact path='/password-reset/done/' component={ForgotPasswordConfirmed} />
      <Route exact path='/favourite_songs/' component={UserFavourite} />
      <Route exact path='/search/:search_string' component={SearchResults} />
      <Route exact path='/' component={MusicCard} />
      <Route path='/dashboard/' component={MusicCard} />
    </Switch>
  </Hoc>
);

export default BaseRouter;
