import './App.css';
import React, {useState} from "react";
import Axios from 'axios';
//import { Button } from '@material-ui/core';


function App() {

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [text1, setText1] = useState("No query.")
  const [text2, setText2] = useState("No query.")
  const [text3, setText3] = useState("No query.")
  const [text4, setText4] = useState("No query.")


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
      var str = "";
      res.data.forEach((entry) => {
        str += `${JSON.stringify(entry, null, '\t')}\n`;
      })
      //Update the text1 state variable with the response data
      setText1(str);
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
      <header className="App-header">
        
        <h1>SpotiFind!</h1>
        <h2>Query 1</h2>
        <input onChange={handleInput1}></input>
        <button onClick={exampleQuery1}>Find tracks!</button>
        <p>{input1}</p>
        <p>{text1}</p>
        
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
