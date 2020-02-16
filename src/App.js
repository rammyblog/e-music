import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import MusicCard from "./containers/MusicCard";
import { toast } from 'react-toastify';


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    toast.configure()
    return (
      <Router>
        <CustomLayout {...this.props} />

        <MusicCard />
        <BaseRouter />

      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
