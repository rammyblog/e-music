import React, { useState, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { store } from "../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@material-ui/core/CircularProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        E-music
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp(props) {

  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");

  const [errResponse, setErrResponse] = React.useState();

  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const [active, setActive] = useState(false);

  function validateEmail(email) {
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setEmailError(!re.test(String(email).toLowerCase()));
  }

  const userNameValidator = username => {
    // eslint-disable-next-line
    let re = /^([a-zA-Z0-9@/./+/-/_]+)$/;
    let userNameChecker = re.test(
      String(username)
        .trim()
        .toLowerCase()
    );

    if (userNameChecker || username.trim() > 150) {
      setUsernameError(false);
    } else {
      setUsernameError(false);
    }
  };

  const passwordValidator = password => {
    let re = /^([0-9]+)$/;

    let passwordChecker = re.test(password);

    if (passwordChecker || password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const passwordMatch = password2 => {
    let password1Value = { password1 }.password1;
    if (password1Value !== password2) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const validator = () => {
    let firstNameValue = { firstName }.firstName;
    let lastNameValue = { lastName }.lastName;
    let usernameValue = { username }.username;
    let password1Value = { password1 }.password1;
    let password2Value = { password2 }.password2;
    let emailValue = { email }.email;

    if (
      firstNameValue !== "" &&
      lastNameValue !== "" &&
      usernameValue !== "" &&
      password1Value !== "" &&
      password2Value !== "" &&
      emailValue !== "" &&
      emailError === false && usernameError === false && passwordError === false
    ) {
      return false;
    } else {
      return true;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;
    const username = e.target.username.value;
    await props.onAuth(
      firstName,
      lastName,
      username,
      email,
      password1,
      password2
    );

    const token = store.getState().auth.token;

    // const token = store.getState().auth.token
    console.log(store.getState().auth);




    if (token) {
      let welcomeMsg = "Welcome " + username;
      toast.success(welcomeMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false
      });

      setTimeout(() => {
        props.history.push("/dashboard/");
      }, 5000);
    } else {
      const response = Object.values(store.getState().auth.error.response.data);
      setErrResponse(response);

    }
  }

  return (
    <Fragment>


      {
        !props.isAuthenticated ?

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
          </Typography>
              {props.error ? (
                <Typography component="h1" color="error" variant="h5">
                  {errResponse}
                </Typography>
              ) : null}

              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={event => {
                        setFirstName(event.target.value);
                        validator();
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={event => {
                        setLastName(event.target.value);
                        validator();
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      error={emailError}
                      autoComplete="email"
                      onChange={event => {
                        setEmail(event.target.value);
                        validateEmail(event.target.value);
                        validator();
                      }}
                    />

                    {{ emailError }.emailError ? (
                      <Typography color="error">Enter a valid email</Typography>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      error={usernameError}
                      onChange={event => {
                        setUsername(event.target.value);
                        userNameValidator(event.target.value);
                        validator();
                      }}
                    />

                    {{ usernameError }.usernameError ? (
                      <Typography color="error">
                        Username can only contain 150 characters or fewer. Letters,
                        digits and @/./+/-/_ only.
                  </Typography>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password1"
                      label="Password"
                      type="password"
                      id="password1"
                      autoComplete="current-password"
                      error={passwordError || passwordMatchError}
                      onChange={event => {
                        setPassword1(event.target.value);
                        passwordValidator(event.target.value);

                        validator();
                      }}
                      onFocus={event => {
                        setActive(true);
                      }}
                      onBlur={event => {
                        setActive(false);
                      }}
                    />

                    {{ active }.active ? (
                      <Fragment>
                        <Typography color="primary">
                          Your password can't be too similar to your other personal
                          information.
                    </Typography>

                        <Typography color="primary">
                          Your password must contain at least 8 characters.
                    </Typography>

                        <Typography color="primary">
                          Your password can't be a commonly used password.
                    </Typography>

                        <Typography color="primary">
                          Your password can't be entirely numeric.
                    </Typography>
                      </Fragment>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password2"
                      label="Confrim Password"
                      type="password"
                      id="password2"
                      autoComplete="current-password"
                      error={passwordMatchError}
                      onChange={event => {
                        setPassword2(event.target.value);
                        passwordMatch(event.target.value);
                        validator();
                      }}
                    />
                    {passwordMatchError ? (
                      <Typography color="secondary">Password do not match</Typography>
                    ) : null}
                  </Grid>
                </Grid>
                <ToastContainer />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={validator()}
                >
                  {props.loading ? <CircularProgress color="secondary" /> : "Sign Up"}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/login/" variant="body2">
                      Already have an account? Sign in
                </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container> :
          props.history.push('/dashboard/')
      }
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    response: state.auth.response,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (firstname, lastname, username, email, password1, password2) =>
      dispatch(
        actions.authSignup(
          firstname,
          lastname,
          username,
          email,
          password1,
          password2
        )
      ),
    onTryAutoSignup: () => dispatch(actions.authCheckState())

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
