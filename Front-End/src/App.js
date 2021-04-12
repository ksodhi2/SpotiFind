import './App.css';
import React, {useState} from "react";
import Axios from 'axios';
//import { Button } from '@material-ui/core';


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
  const [input11, setInput11] = useState("");


  const [text1, setText1] = useState("No query.")
  const [text2, setText2] = useState("No query.")
  const [text3, setText3] = useState("No query.")
  const [text4, setText4] = useState("No query.")
  const [text5, setText5] = useState("No query.")
  const [text6, setText6] = useState("No query.")



  const exampleQuery1 = () => {
    
    //Make a GET call to the backend server
    Axios.get("http://localhost:8080/api/getTrackInfo", {
      //Passing in the track as the input parameter
      params:{
        track: input1
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
    //Make a GET call to the backend server
    Axios.get("http://localhost:8080/api/getCountryTopTracks", {
      //Passing in the country as the input parameter
      params:{
        country: input2
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
      setText2(str);
    })
  }

  //Put the third query here
  const exampleQuery3 = () => {
    //Make a GET call to the backend server
    Axios.get("http://localhost:8080/api/getUserTop", {
      //Passing in the country as the input parameter
      params:{
        userId: input3
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
      setText3(str);
    })
  }

  //Put the fourth query here
  const exampleQuery4 = () => {
    Axios.get("http://localhost:8080/api/insertTopTrack", {
      //Passing in the country as the input parameter
      params:{
        userId: input4,
        trackId: input5,
        trackRank: input6
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
        var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText4("Insert Successful");
    })
  }

  const exampleQuery5 = () => {
    Axios.get("http://localhost:8080/api/deleteTopTrack", {
      //Passing in the country as the input parameter
      params:{
        userId: input7,
        trackId: input8,
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
        var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText5("Delete Successful");
    })
  }

  const exampleQuery6 = () => {
    Axios.get("http://localhost:8080/api/updateTrackRanking", {
      //Passing in the country as the input parameter
      params:{
        userId: input9,
        trackId: input10,
        trackRank: input11
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
        var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText6("Update Successful");
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

  function handleInput11(event) {
    setInput11(event.target.value);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>SpotiFind!</h1>
        <h2>Search For A Track</h2>
        <input placeholder= "Track Name" onChange={handleInput1}></input>
        <button onClick={exampleQuery1}>Find tracks!</button>
        <p>{text1}</p>
        
        <h2>Search For Top Tracks By Country</h2>
        <input placeholder = "Country" onChange={handleInput2}></input>
        <button onClick={exampleQuery2}>Find tracks!</button>
        <p>{text2}</p>
        
        <h2>Lookup your Top Tracks</h2>
        <input placeholder = "User ID" onChange={handleInput3}></input>
        <button onClick={() => exampleQuery3()}>Find tracks!</button>
        <p>{text3}</p>

        <h2>Insert A Top Track</h2>
        <input placeholder = "User ID" onChange={handleInput4}></input>
        <input placeholder = "Track ID" onChange={handleInput5}></input>
        <input placeholder = "Track Rank" onChange={handleInput6}></input>
        <button onClick={() => exampleQuery4()}>Insert Track!</button>
        <p>{text4}</p>

        <h2>Delete A Top Track</h2>
        <input placeholder = "User ID" onChange={handleInput7}></input>
        <input placeholder = "Track ID" onChange={handleInput8}></input>
        <button onClick={() => exampleQuery5()}>Delete Track!</button>
        <p>{text5}</p>

        <h2>Update Track Ranking</h2>
        <input placeholder = "User ID" onChange={handleInput9}></input>
        <input placeholder = "Track ID" onChange={handleInput10}></input>
        <input placeholder = "New Rank" onChange={handleInput11}></input>
        <button onClick={() => exampleQuery6()}>Update Ranking!</button>
        <p>{text6}</p>

      </header>
    </div>
  );
}

export default App;
