import React, { Component, Fragment } from "react";
import axios from "axios";
import Musicplayer from "./Musicplayer";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { withRouter } from "react-router-dom";

// CSS
import "./musicPlayer.css";
import "react-toastify/dist/ReactToastify.css";

class UserFavorite extends Component {
    state = {
        songData: null,
        userFavorite: null,
        songCount: null
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

    componentDidMount() {
        if (this.props.authenticated) {
            this.getMusicFromDB();
            this.getUserFavMusic();
        }

    }


    getFavouriteCount = (song_id) => {
        axios.get(`https://react-emusic.herokuapp.com/favorite/music/${song_id}`).then(res => {
            this.setState({
                songCount: res.data
            });
            // return ({ song_id: res.data })
        }).catch(err => {
            console.log(err);
        });
    };


    getMusicFromDB = () => {
        axios.get("https://react-emusic.herokuapp.com/favorite/music/list").then(res => {
            console.log(res.data);

            this.setState({
                songData: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    };




    getUserFavMusic = () => {
        axios.get("https://react-emusic.herokuapp.com/get/favorite/music/").then(res => {
            // console.log(Object.values(res.data))
            let songID = res.data.map(song => {
                return Object.values(song);
            });

            this.setState({
                userFavorite: songID.flat()
            });
        }).catch((err) => {
            console.log(err);

            if (err.response.status === 500) {
                this.props.history.push('/login/');
            }
        }
        );
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
                                        <h2 className='text-class'>Your favorite songs</h2>

                                        {
                                            songData && songData.length <= 0 ?
                                                <h2 className='text-class'>You have 0 favorite songs</h2> : null
                                        }

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
                            }

                        </Fragment>

                        : this.props.history.push('/login/')
                }
            </Fragment>
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
    connect(mapStateToProps, mapDispatchToProps)(UserFavorite)
);
