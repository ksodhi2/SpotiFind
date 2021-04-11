import React from "react";
import {loginUrl}from "./Spotify.js";

function Login() {
  return (
    <div className="login">
      
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;