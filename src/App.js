import logo from './logo.svg';
import './App.css';
import Cpu from "./components/cpu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Practica 1 Sopes 2</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-graph" >
          <Cpu/>
        </div>
      </header>
      
    </div>
  );
}

export default App;
