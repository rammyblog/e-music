import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './LayoutStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from 'react-router-dom';


class CustomLayout extends React.Component {

  handleSubmit = (e) => {

    let raw_search_value = e.target.search.value;
    let search_string = this.convertSpacesToPlus(raw_search_value);
    this.props.history.push(`/search/${search_string}`);
    // <Redirect to='l' />;
    // < Redirect to={{ pathname: '/search', state: { search_string: { search_string } } } />

    e.preventDefault();
  };

  convertSpacesToPlus = (text) => {
    const regex = / /g;
    return text.replace(regex, '+');
  };

  render() {
    const { classes } = this.props;
    const { authenticated } = this.props;


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
              <Link to='/dashboard'>
                E-music
              </Link>
            </Typography>

            <Typography variant="h6">
              Favourite
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSubmit} >
                <InputBase

                  name='search'

                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </form>
            </div>


            <CloudUploadIcon color='inherit' />
            {/* <Button color="inherit">Upload</Button> */}
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
