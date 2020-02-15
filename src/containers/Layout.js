import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './LayoutStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


class CustomLayout extends React.Component {
  render() {
    const { classes } = this.props;
    const { authenticated } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
              e-Music
          </Typography>

            <CloudUploadIcon color='inherit' />
            <Button color="inherit">Upload</Button>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomLayout)));
