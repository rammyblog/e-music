import React, { useState }  from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Notemaster
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function ForgotPassword(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState(true);
  





  function validateEmail(email) {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(String(email).toLowerCase())){

        setErrors(false)
    }else{
        setErrors(true)

    }
}


  function handleSubmit (e) {
    e.preventDefault();    
    const email = e.target.email.value
    axios.post('https://notemaster.herokuapp.com/api/auth/password/reset/', {
        email: email
    }).then(
        res => {
            

        if(res.data.detail === 'Password reset e-mail has been sent.'){
            toast.success('Email has been sent successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false
                });

                setTimeout(() => {
                  props.history.push('/password-reset/done/')
              }, 5000);


                
        }
        

    
        }).catch(err => {
            console.log(err)
        })
      

  }


  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <VpnKeyIcon className={classes.avatar}>
          <LockOutlinedIcon />
        </VpnKeyIcon>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error = {errors}
            id="text"
            label="Email"
            name="email"
            autoFocus
            onChange={event => {
              
                validateEmail(event.target.value)

            }}
          />


        <ToastContainer />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {errors}
          >
            Sign In
          </Button>

      
          <Grid container>
            <Grid item xs>
              <Link href="/login/" variant="body2">
                Login
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}



export default ForgotPassword