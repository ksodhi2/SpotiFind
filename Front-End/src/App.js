import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Login from "./Login.js";
import {getTokenFromUrl} from "./Spotify";



function App() {

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [text1, setText1] = useState("No query.")
  const [text2, setText2] = useState("No query.")
  const [text3, setText3] = useState("No query.")
  const [text4, setText4] = useState("No query.")
  const [token, setToken] = useState();


  const [userId1, setUserId1] = useState("");
  const [userCountry1, setUserCountry1] = useState("");
  const [userId4, setUserId4] = useState("");


  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
    }

    console.log("token", token);
  }, []);

  const exampleQuery1 = () => {
    
    //Make a GET call to the backend server
    Axios.get("http://localhost:8080/api/getArtistInfo", {
      //Passing in the artist as the input parameter
      params:{
        artist: input1
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
      var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText1(str);
    })
  }

  const insertUser = () => {
    console.log(userId1);
       console.log(userCountry1);
     Axios.get("http://localhost:8080/api/insertUser", {
      //Passing in the artist as the input parameter
        params: {userId: userId1,
        userCountry: userCountry1
        }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
      var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText1("Insert Successful");
    })
  }

  const findUser = () => {
   
     Axios.get("http://localhost:8080/api/findUser", {
      //Passing in the artist as the input parameter
        params: {
          userId: userId4
        
        }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      var str;
      if(res != null) {
        str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText2(str);
    })
  }

  //Put the second query here
  const exampleQuery2 = () => {
    
  }

  //Put the third query here
  const exampleQuery3 = () => {
    
  }

  //Put the fourth query here
  const exampleQuery4 = () => {
    
  }


  /* SETS THE INPUT STATE VARIABLES WHEN THE USER TYPES */
  function handleInput1(event) {
    setInput1(event.target.value);
  }

  function handleInput2(event) {
    setInput2(event.target.value);
  }

  function handleInput3(event) {
    setInput3(event.target.value);
  }

  function handleInput4(event) {
    setInput4(event.target.value);
  }
  

  return (
    <div className="App">
      <script src="https://sdk.scdn.co/spotify-player.js"></script>

      <header className="App-header">
        
        <h1>SpotiFind!</h1>

        <h2>User Controls</h2>
        {/* User id for insert */}
        <p>User Id</p>

        <input onChange={(event) => setUserId1(event.target.value)}></input>
        <p>User country</p>
        <input onChange={(event) => setUserCountry1(event.target.value)}></input>
        <button onClick={insertUser}>Insert User</button>
        <p>{text1}</p>
        {/* User id for update */}
        <input onChange={handleInput1}></input>
        <input onChange={handleInput1}></input>
        <button onClick={exampleQuery1}>Update User</button>
        {/* User id for delete */}
        <input onChange={handleInput1}></input>
        <button onClick={exampleQuery1}>Delete User</button>
        {/* User id for search */}
        <input onChange={(event) => setUserId4(event.target.value)}></input>
        <button onClick={findUser}>Search User</button>
        <p>{text2}</p>
        
        <h2>Query 2</h2>
        <input onChange={handleInput2}></input>
        <button onClick={exampleQuery2}>Find tracks!</button>
        <p>{input2}</p>
        <p>{text2}</p>
        
        <h2>Query 3</h2>
        <input onChange={handleInput3}></input>
        <button onClick={() => exampleQuery3()}>Find tracks!</button>
        <p>{input3}</p>
        <p>{text3}</p>

        <h2>Query 4</h2>
        <input onChange={handleInput4}></input>
        <button onClick={() => exampleQuery4()}>Find tracks!</button>
        <p>{input4}</p>
        <p>{text4}</p>
      </header>
    </div>
  );
}

export default App;
