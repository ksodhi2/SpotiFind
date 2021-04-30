import React from 'react';
import { Box, Grid } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import "../App.css"

const cardStyles = {
    backgroundColor: "white",
    borderRadius: "0.25rem",
    margin: "0.5rem"
}

export default function(props) {
    return <div className="trackList">
        { props.tracks.length > 0 ? props.tracks.map((track) => (
            
            <Box style={cardStyles}>
                <Grid container alignItems="center" justify="flex-start">
                    <Grid item xs={3}>
                        {track.album.images.length >= 3 && <img style={{width: "70%"}}src={track.album.images[1].url}/> }
                    </Grid>
                    <Grid item xs={6} >
                        <h2 style={{textAlign: "left"}}>{track.name}</h2>
                        <p style={{textAlign: "left"}}>{track.artists[0].name}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <button style={{background: "none", border: "none", outline: "none"}} onClick={() => props.playTracks([track.uri])}>
                            <PlayCircleOutlineIcon style={{fontSize: "3rem"}}/>
                        </button>
                    </Grid>
                </Grid>
            </Box>
        )) : <h3 style={{color: "white"}}>No results, try adjusting your search</h3>}
    </div>
}