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
  const [text1, setText1] = useState("Insert")
  const [text2, setText2] = useState("Update")
  const [text3, setText3] = useState("Delete")
  const [text4, setText4] = useState("Search")
  const [text5, setText5] = useState("Advanced Query")

  const [token, setToken] = useState();


  const [userId1, setUserId1] = useState("");
  const [userCountry1, setUserCountry1] = useState("");

  const [userId2, setUserId2] = useState("");
  const [userCountry2, setUserCountry2] = useState("");

  const [userId3, setUserId3] = useState("");

  const [userId4, setUserId4] = useState("");

  const [userId5, setUserId5] = useState("");

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
    }

    console.log("token", token);
  }, []);

  // const exampleQuery1 = () => {
    
  //   //Make a GET call to the backend server
  //   Axios.get("http://localhost:8080/api/getArtistInfo", {
  //     //Passing in the artist as the input parameter
  //     params:{
  //       artist: input1
  //     }
  //   }).catch(function (error) {   //Catch any error from the response
  //     console.log(error);
  //   }).then( (res) => { 
  //     //Adding the query response to a single string
  //     if(res != null) {
  //     var str = JSON.stringify(res.data, null, '\t');
  //     }
  //     //Update the text1 state variable with the response data
  //     setText1(str);
  //   })
  // }

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

  const updateUser = () => {
    console.log(userId2);
    console.log(userCountry2);
    Axios.get("http://localhost:8080/api/updateUser", {
      //Passing in the artist as the input parameter
        params: {userId: userId2,
        userCountry: userCountry2
      }
    }).catch(function (error) {   //Catch any error from the response
      console.log(error);
    }).then( (res) => { 
      //Adding the query response to a single string
      if(res != null) {
      var str = JSON.stringify(res.data, null, '\t');
      }
      //Update the text1 state variable with the response data
      setText2("Update Successful");
    })
  }


  const deleteUser = () => {
    console.log(userId3)
    Axios.get("http://localhost:8080/api/deleteUser", {
       params: {
         userId: userId3
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
     setText3('Delete successful');
   })
 }


  const findUser = () => {
   
     Axios.get("http://localhost:8080/api/findUser", {
  
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
      setText4(str);
    })
  }

  const findHighestRankGenre = () => {
   
    Axios.get("http://localhost:8080/api/findHighestRankGenre", {
 
       params: {
         userId: userId5
       
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
     setText5(str);
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
  

  return (
    <div className="App">
      <script src="https://sdk.scdn.co/spotify-player.js"></script>

      <header className="App-header">
        
        <h1>SpotiFind!</h1>

        <h2>User Controls</h2>
        {/* User id for insert */}
        <p>User Id and User Country</p>
        <input onChange={(event) => setUserId1(event.target.value)}></input>
        <input onChange={(event) => setUserCountry1(event.target.value)}></input>
        <button onClick={insertUser}>Insert User</button>
        <p>{text1}</p>

        {/* User id for update */}
        <input onChange={(event) => setUserId2(event.target.value)}></input>
        <input onChange={(event) => setUserCountry2(event.target.value)}></input>
        <button onClick={updateUser}>Update User Country</button>
        <p>{text2}</p>

        {/* User id for delete */}
        <input onChange={(event) => setUserId3(event.target.value)}></input>
        <button onClick={deleteUser}>Delete User</button>
        <p>{text3}</p>

        {/* User id for search */}
        <input onChange={(event) => setUserId4(event.target.value)}></input>
        <button onClick={findUser}>Search User</button>
        <p>{text4}</p>
        
        {/* advanced query */}
        <input onChange={(event) => setUserId5(event.target.value)}></input>
        <button onClick={findHighestRankGenre}>Highest Rank Genre</button>
        <p>{text5}</p>

      </header>
    </div>
  );
}

export default App;
