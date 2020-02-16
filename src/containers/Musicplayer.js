import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import styles from "./MusicplayerStyles"
import ReactPlayer from "react-player"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import { toast } from 'react-toastify';
import axios from 'axios';



// CSS
import "./musicPlayer.css";
import 'react-toastify/dist/ReactToastify.css';

class Musicplayer extends Component {



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
    }

    onPause = () => {
        toast.warning('⏹️ Paused !🎶', {
            position: "top-right",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    onEnded = () => {
        toast.error('⏹️ Stopped !🎶', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

    }

    getSong = (name) => {
        console.log(name);
    }


    render() {
        const { classes, song } = this.props;

        return (
            <Fragment>
                <Card className={`${classes.root} fullscreen`}>
                    <CardContent>
                        <div style={{ height: "3em" }}>
                            <Typography variant="h4" color="primary" style={{ fontSize: '1.5rem' }}>
                                {song.title} - <span>{song.artist_name}</span>
                            </Typography>
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

                            <Typography className='favNumber' color='inherit'>5</Typography>
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
                                    toast.success(`▶️ Playing ${song.title} by ${song.artist_name} !🎶`, {
                                        position: "top-right",
                                        autoClose: 1300,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true
                                    });
                                }}
                                onPause={() => {
                                    toast.warning(`⏹️ Paused ${song.title} by ${song.artist_name}  !🎶`, {
                                        position: "top-right",
                                        autoClose: 1300,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true
                                    });
                                }
                                }
                                onEnded={this.onEnded}

                            />
                        </div>

                        <Typography className={classes.pos} color="textSecondary">
                            Hip Hop
                                    </Typography>
                    </CardContent>
                </Card>

            </Fragment>
        )

    }
}

export default withStyles(styles)(Musicplayer)
