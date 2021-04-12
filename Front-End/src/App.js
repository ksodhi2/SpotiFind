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
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");
  const [input8, setInput8] = useState("");
  const [input9, setInput9] = useState("");
  const [input10, setInput10] = useState("");
  const [text1, setText1] = useState("No query.")
  const [text2, setText2] = useState("No query.")
  const [text3, setText3] = useState("No query.")
  const [text4, setText4] = useState("No query.")
  const [text5, setText5] = useState("No query.")
  const [text6, setText6] = useState("No query.")
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
    Axios.get("http://localhost:8080/api/findGenre", {
      //Passing in the track as the input parameter
      params:{
        genre: input1
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      var str = "";
      //if(typeof(data) === "string"){data = JSON.parse(data)}
      res.data.forEach((entry) => {
        str += `${JSON.stringify(entry, null, '\t')}\n`;
      })
      //Update the text1 state variable with the response data
      setText1(str);
    })
  }


  //Put the second query here
  const exampleQuery2 = () => {
    Axios.get("http://localhost:8080/api/insertTopGenres", {
      //Passing in the country as the input parameter
      params:{
        userId: input2,
        genreId: input3,
        genreRank: input4
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
        var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText2("Insertion Complete");
    })
  }

  const exampleQuery3 = () => {
    Axios.get("http://localhost:8080/api/deleteTopGenres", {
      //Passing in the country as the input parameter
      params:{
        userId: input5,
        genreId: input6,
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
        var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText3("Deletion Complete");
    })
  }

  const exampleQuery4 = () => {
    //Make a GET call to the backend server
    Axios.get("http://localhost:8080/api/getLowkeyGenres", {
      //Passing in the country as the input parameter
      params:{
        userId: input7
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      var str = "";
      res.data.forEach((entry) => {
        str += `${JSON.stringify(entry, null, '\t')}\n`;
      })
      //Update the text1 state variable with the response data
      setText4(str);
    })
  }

  const exampleQuery5 = () => {
    Axios.get("http://localhost:8080/api/updateGenres", {
      //Passing in the country as the input parameter
      params:{
        userId: input8,
        genreId: input9,
        genreRank: input10
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
        var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText5("Update Complete");
    })
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

  function handleInput5(event) {
    setInput5(event.target.value);
  }

  function handleInput6(event) {
    setInput6(event.target.value);
  }

  function handleInput7(event) {
    setInput7(event.target.value);
  }

  function handleInput8(event) {
    setInput8(event.target.value);
  }

  function handleInput9(event) {
    setInput9(event.target.value);
  }
  
  function handleInput10(event) {
    setInput10(event.target.value);
  }
  

  return (
    <div className="App">
      <script src="https://sdk.scdn.co/spotify-player.js"></script>

      <header className="App-header">
        
        <h1>SpotiFind!</h1>
        <h2>Search Genre</h2>
        <input placeholder= "Genre Name" onChange={handleInput1}></input>
        <button onClick={exampleQuery1}>Find Genres!</button>
        <p>{text1}</p>
        
        
        <h2>Insert a genre into your top genres</h2>
        <input placeholder = "User ID" onChange={handleInput2}></input>
        <input placeholder = "Genre ID" onChange={handleInput3}></input>
        <input placeholder = "Genre Rank" onChange={handleInput4}></input>
        <button onClick={() => exampleQuery2()}>Insert Genre!</button>
        <p>{text2}</p>
        
        <h2>Delete a genre from your top genres</h2>
        <input placeholder = "User ID" onChange={handleInput5}></input>
        <input placeholder = "Genre ID" onChange={handleInput6}></input>
        <button onClick={() => exampleQuery3()}>Delete Genre!</button>
        <p>{text3}</p>

        <h2>Find some lowkey genres you like!</h2>
        <input placeholder = "User ID" onChange={handleInput7}></input>
        <button onClick={exampleQuery4}>Click Here!</button>
        <p>{text4}</p>

        <h2>Update your top genres</h2>
        <input placeholder = "User ID" onChange={handleInput8}></input>
        <input placeholder = "Genre ID" onChange={handleInput9}></input>
        <input placeholder = "Desired Rank" onChange={handleInput10}></input>
        <button onClick={() => exampleQuery5()}>Update Top Genres</button>
        <p>{text5}</p>
      </header>
    </div>
  );
}

export default App;
