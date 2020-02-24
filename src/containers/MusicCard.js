import React, { Component, Fragment } from "react";
import axios from "axios";
import Musicplayer from "./Musicplayer";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { withRouter } from "react-router-dom";

// CSS
import "./musicPlayer.css";
import "react-toastify/dist/ReactToastify.css";

class MusicCard extends Component {
    state = {
        songData: null,
        userFavorite: null,
        songCount: null
    };

    componentDidMount() {
        this.getMusicFromDB();
        this.getUserFavMusic();
    }

    getFavouriteCount = (song_id) => {


        axios.get(`https://react-emusic.herokuapp.com/api/favorite/music/${song_id}`).then(res => {
            this.setState({
                songCount: res.data
            });
        }).catch(err => {
            console.log(err.response);

        });
    };


    getMusicFromDB = () => {
        axios.get("https://react-emusic.herokuapp.com/api/music/").then(res => {

            this.setState({
                songData: res.data
            });
        });
    };

    static getDerivedStateFromProps(newProps, state) {
        const token = newProps.token || localStorage.getItem("token");

        if (token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: "Token " + token
            };
        }

        return null;
    }




    getUserFavMusic = () => {
        axios.get("https://react-emusic.herokuapp.com/api/get/favorite/music/").then(res => {

            let songID = res.data.map(song => {
                return Object.values(song);
            });

            this.setState({
                userFavorite: songID.flat()
            });
        }).catch((err) => {
            if (err.response.status === 500) {
                this.props.history.push('/login/');
            }
        }
        );

        // return songID;


    };



    render() {
        const { songData, userFavorite } = this.state;
        const token = localStorage.getItem("token");
        const authenticated = this.props.authenticated;

        return (
            <Fragment>

                {
                    authenticated || token ?
                        <Fragment>
                            {
                                userFavorite ?
                                    <Fragment>
                                        {
                                            songData
                                                ? songData.map((item, _index) => {
                                                    return <Musicplayer
                                                        song={item}
                                                        favSong={userFavorite}
                                                        key={_index} />;
                                                })
                                                : null
                                        }
                                    </Fragment >
                                    : null
                            }</Fragment>

                        : this.props.history.push('/login/')
                }
            </Fragment >
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MusicCard)
);
