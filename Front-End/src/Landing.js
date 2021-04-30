import React from "react";
import {loginUrl}from "./Spotify.js";
import {Grid, Button} from "@material-ui/core"
import {green, blueGrey} from '@material-ui/core/colors';

function Landing(){
    return <Grid container justify="center" style={{backgroundColor: green[600], height: "100vh"}} >
                <Grid container justify="center" style={{color: "white", paddingTop: "15%", marginBottom: 0}}>
                    <Grid item>
                        <h1 style={{fontSize: "6rem"}}>SpotiFind</h1>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{marginTop: "-10rem"}}>
                <Grid item  justify="center" style={{ justify: "center"}}>
                    <a href={loginUrl} style={{textAlign: "center"}} >
                        <button style={{color: "white", backgroundColor: "black", borderRadius: "5rem", fontSize: "3rem", padding: "3rem", border: "none"}}>
                            Login with Spotify
                        </button>
                    </a>
                </Grid>
                </Grid>
            </Grid>
}

export default Landing;