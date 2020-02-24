import React, { Component, Fragment } from "react";
import axios from "axios";
import Musicplayer from "./Musicplayer";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { withRouter } from "react-router-dom";

// CSS
import "./musicPlayer.css";
import "react-toastify/dist/ReactToastify.css";

class SearchResults extends Component {
    state = {
        songData: null,
        userFavorite: null,
        songCount: null,
        search_params: this.props.match.params.search_string
    };

    componentDidMount() {
        if (this.props.authenticated) {
            this.getMusicFromDB();
            this.getUserFavMusic();
        }

    }


    getFavouriteCount = (song_id) => {
        axios.get(`https://react-emusic.herokuapp.com/api/favorite/music/${song_id}`).then(res => {
            this.setState({
                songCount: res.data
            });
            // return ({ song_id: res.data })
        }).catch(err => {
            console.log(err.response);
        });
    };

    componentDidUpdate(prevProps) {

        if (this.state.search_params !== this.props.match.params.search_string) {
            this.getMusicFromDB();
            this.setState({
                search_params: this.props.match.params.search_string
            });
        }

    }


    getMusicFromDB = () => {
        axios.get(`https://react-emusic.herokuapp.com/api/music/?search=${this.props.match.params.search_string}`).then(res => {
            this.setState({
                songData: res.data
            });
        });
    };




    static getDerivedStateFromProps(newProps, state) {
        const token = newProps.token || localStorage.getItem("token");

        console.log(newProps);
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
            // console.log(Object.values(res.data))
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

                                        <h2 className='text-class'>Displaying Search Results for "<span className='stylish-text'> {this.props.match.params.search_string} </span>"</h2>

                                        {
                                            songData.length <= 0 && songData ?
                                                <h2 className='text-class'>{this.props.match.params.search_string} Not found</h2> : null
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
                        </Fragment> : this.props.history.push('/login/')}
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
    connect(mapStateToProps, mapDispatchToProps)(SearchResults)
);
