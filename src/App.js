import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import { toast } from 'react-toastify';
import CustomLayout from "./containers/Layout";


// CSS
import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    toast.configure();
    return (
      <Router>
        <CustomLayout />
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
