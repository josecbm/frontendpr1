import logo from './logo.svg';
import './App.css';
import Cpu from "./components/cpu";
import Graph from "./components/graph";
import TreeView from "./components/treeView";
import axios from 'axios';
import React, { useState} from 'react';


function App() {
  const [process, setProcess] = useState('')

  async function  handleClick(e) {
    console.log(process);
    e.preventDefault();
    console.log(process.value);
    let obj = {
      "id":process.value,
      "mensaje":"main"
    }
    ;
    console.log(obj);
    let response = await axios.post('http://3.141.196.231:3000/delProc',obj);
    console.log(response.data);

  }
  function handleChange(event) {
    setProcess({value: event.target.value});
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Practica 1 Sopes 2</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className="App-graph" >
          <Graph/>
        </div>
        <br/>
        <br/>
        <div className="App-treeView" >
          <TreeView/>
          <br/>
          <input type="text"  onChange={handleChange}></input>
          <button onClick={handleClick}>Kill Proccess</button>
        </div>
        
      </header>
      
    </div>

  );
}

export default App;
