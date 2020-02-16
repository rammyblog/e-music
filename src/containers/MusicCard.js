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
import Musicplayer from './Musicplayer';



// CSS
import "./musicPlayer.css";
import 'react-toastify/dist/ReactToastify.css';


export default class MusicCard extends Component {
    state = {
        songData: null
    }


    componentDidMount() {
        this.getMusicFromDB();

    }

    getMusicFromDB = () => {

        axios.get('http://127.0.0.1:8000/music/').then(res => {

            console.log(res.data);

            this.setState({
                songData: res.data
            })

        })



    }

    render() {
        const { songData } = this.state;

        return (
            <Fragment>

                {songData ?

                    songData.map((item, _index) => {
                        return <Musicplayer song={item} key={_index} />
                    })



                    : null}

            </Fragment>


        )
    }
}
