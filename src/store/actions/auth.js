import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = (error, response) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    response: response,
    token: ''
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    await axios
      .post("https://react-emusic.herokuapp.com/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {


        dispatch(authFail(err, err.response));
      });
  };
};


export const authSignup = (firstname, lastname, username, email, password1, password2) => {
  return async (dispatch) => {
    dispatch(authStart());
    await axios.post('https://react-emusic.herokuapp.com/rest-auth/registration/', {
      username: username,
      email: email,
      first_name: firstname,
      last_name: lastname,
      password1: password1,
      password2: password2

    }).then(res => {
      const token = res.data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('user', username);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(token, username));
      dispatch(checkAuthTimeout(3600));

    }).catch(err => {
      dispatch(authFail(err, err.response));
    });
  };
};



export const authCheckState = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
