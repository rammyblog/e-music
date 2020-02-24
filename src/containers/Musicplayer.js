import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "./MusicplayerStyles";
import ReactPlayer from "react-player";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { toast } from "react-toastify";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { withRouter } from "react-router-dom";

// CSS
import "./musicPlayer.css";
import "react-toastify/dist/ReactToastify.css";

class Musicplayer extends Component {
    state = {
        favSongArray: this.props.favSong,
        favouriteSongCount: null
    };

    getFavouriteCount = () => {
        let song_id = this.props.song.id;

        return axios
            .get(`https://react-emusic.herokuapp.com/favorite/music/${song_id}`)
            .then(res => {
                return res.data;

            })
            .catch(err => {
                console.log(err.response);
            });
    };

    updateFavouriteSongCount = () => {
        this.getFavouriteCount().then(res => {
            this.setState({
                favouriteSongCount: res
            });
        });
    };

    componentDidMount() {
        this.updateFavouriteSongCount();
    }

    toggleFav = id => {
        let tempFavSongArray = this.state.favSongArray.slice();
        let favBoolean = tempFavSongArray.includes(id);


        this.makeFavourite(id, !favBoolean);

        if (tempFavSongArray.includes(id)) {
            tempFavSongArray.splice(tempFavSongArray.indexOf(id), 1);
        } else {
            tempFavSongArray.push(id);
        }
        this.setState(() => {
            return {
                favSongArray: tempFavSongArray
            };
        }, this.updateFavouriteSongCount());
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
    makeFavourite = (song_id, favBoolean) => {
        axios
            .post("https://react-emusic.herokuapp.com/favorite/music/", {
                favourite: favBoolean,
                music: song_id
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    onPlay = () => {
        toast.success(`▶️ Playing  !🎶`, {
            position: "top-right",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        // console.log("Playing")
    };

    onPause = () => {
        toast.warning("⏹️ Paused !🎶", {
            position: "top-right",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    };

    onEnded = () => {
        toast.error("⏹️ Stopped !🎶", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    };



    render() {
        const { classes, song } = this.props;
        const { favSongArray, favouriteSongCount } = this.state;

        if (favouriteSongCount) {
            console.log(favouriteSongCount);
        }


        return (
            <Fragment>
                <Card
                    className={`${classes.root} fullscreen Musicplayer-root-responsive`}
                >
                    <CardContent>
                        <div style={{ height: "3em" }}>
                            <Typography
                                variant="h4"
                                color="primary"
                                style={{ fontSize: "21px" }}
                            >
                                {song.title} - <span>{song.artist_name}</span>
                            </Typography>

                            <div onClick={() => this.toggleFav(song.id)}>
                                {favSongArray.includes(song.id) ? (
                                    <FavoriteIcon
                                        fontSize="large"
                                        color="primary"
                                        style={{
                                            margin: "5px 5px",
                                            position: "relative",
                                            bottom: "50px",
                                            left: "92%"
                                        }}
                                    />
                                ) : (
                                        <FavoriteBorderIcon
                                            fontSize="large"
                                            color="primary"
                                            style={{
                                                margin: "5px 5px",
                                                position: "relative",
                                                bottom: "50px",
                                                left: "92%"
                                            }}
                                        />
                                    )}
                            </div>

                            <Typography className="favNumber" color="inherit">
                                {favouriteSongCount ? favouriteSongCount : 0}
                            </Typography>
                        </div>
                        <div style={{ display: "flex" }}>
                            <ReactPlayer
                                url={song.song}
                                height="150"
                                style={{
                                    display: "inline-block",
                                    borderRadius: "50px",
                                    height: "100%"
                                }}
                                controls
                                onPlay={() => {
                                    toast.success(
                                        `▶️ Playing ${song.title} by ${song.artist_name} !🎶`,
                                        {
                                            position: "top-right",
                                            autoClose: 1300,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true
                                        }
                                    );
                                }}
                                onPause={() => {
                                    toast.warning(
                                        `⏹️ Paused ${song.title} by ${song.artist_name}  !🎶`,
                                        {
                                            position: "top-right",
                                            autoClose: 1300,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true
                                        }
                                    );
                                }}
                                onEnded={this.onEnded}
                            />
                        </div>

                        <Typography className={classes.pos} color="textSecondary">
                            Hip Hop
            </Typography>
                    </CardContent>
                </Card>
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
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Musicplayer))
);
