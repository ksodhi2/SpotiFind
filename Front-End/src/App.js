import logo from './logo.svg';
import './App.css';
import {useState} from "react";
//import { Button } from '@material-ui/core';


function App() {

  const [text, setText] = useState("No text.")

  const updateText = () => {
    setText("All The Single Ladies");
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>SpotiFind!</h1>
        <button onClick={() => updateText()}>Find tracks!</button>
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
