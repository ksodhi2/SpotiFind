import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import Axios from 'axios';
//import { Button } from '@material-ui/core';


function App() {

  const [input, setInput] = useState("");
  const [text, setText] = useState("No text.")

  const updateText = () => {
    setText("All The Single Ladies");
  }

  const exampleQuery = () => {
    console.log("Querying");
    Axios.get('https://localhost:8080/api/get').then((response) => {
      alert('success');
    })
  }

  

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>SpotiFind!</h1>
        <input></input>
        <button onClick={() => exampleQuery()}>Find tracks!</button>
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
