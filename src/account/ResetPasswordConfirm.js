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


function ResetPasswordConfirm(props) {
  const classes = useStyles();


 
    // eslint-disable-next-line
  const [errors, setErrors] = useState(false);



  function handleSubmit (e) {
    
    axios.defaults.headers ={
        "Content-Type": "application/json",
      } 
    
    e.preventDefault();    
    const new_password1 = e.target.new_password1.value
    const new_password2 = e.target.new_password2.value
    const uid = props.match.params.uid
    const token = props.match.params.token

    axios.post('https://notemaster.herokuapp.com/api/auth/password/reset/confirm/', {
        uid:uid,    
        token:token,    
        new_password1: new_password1,
        new_password2: new_password2,
        
    }).then(
        res => {
            console.log(res);
            
            if(res.status === '200'){

                toast.success('Password has been reset successfully! You are now being redirected to the Login page', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false
                    });

                setTimeout(() => {
                    props.history.push('/login/')
                }, 5000);
                
            }
            
        }).catch((err, res) => {
            console.log(err, res)
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
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error = {errors}
            id="new_password1"
            label="New Password"
            name="new_password1"
            autoFocus
            type="password"
            
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error = {errors}
            id="new_password2"
            label="Confirm Password"
            name="new_password2"
            autoFocus
            type="password"
         
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



export default ResetPasswordConfirm