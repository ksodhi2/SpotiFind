import React from "react";
import {loginUrl}from "./Spotify.js";

function Landing(){
    return <div>
        <a href={loginUrl}><button>Login with Spotify</button></a>
    </div>
}

export default Landing;