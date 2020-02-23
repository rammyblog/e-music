import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styles from './LayoutStyles';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';





class CustomLayout extends React.Component {

  handleSubmit = (e) => {

    let raw_search_value = e.target.search.value;
    let search_string = this.convertSpacesToPlus(raw_search_value);
    this.props.history.push(`/search/${search_string}`);
    e.preventDefault();
  };

  convertSpacesToPlus = (text) => {
    const regex = / /g;
    return text.replace(regex, '+');
  };

  render() {
    const { classes } = this.props;
    const token = localStorage.getItem("token");
    const authenticated = this.props.authenticated;


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <Link to='/'>
              <img className={classes.title} src={`https://res.cloudinary.com/rammy/image/upload/c_scale,w_50/v1582484696/S_h1rmoJk8bzhRZ8oeGqg0vpGvP_7nwnbaZ1p9a_e8GuNevYzlpEYLg4rIhWeYabHkD7au5Vk1RPdzLEkmXTT9dvVgOCgLxck1UJUk3LDbSPx_BjX-wPlpuPmkUgCqL4n2663FdDBWEdpkAo_yu3fPP69efMhr0.png`} alt='home-logo' />
            </Link>

            {
              authenticated || token ?

                <Fragment>

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



                  <FavoriteIcon className={classes.title} onClick={() => this.props.history.push('/favourite_songs/')} />
                  <PowerSettingsNewIcon color='inherit' onClick={this.props.logout} />

                </Fragment>

                : null

            }


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
