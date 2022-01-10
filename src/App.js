import './App.css';
import Day6 from './sketches/Day6';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Day6/>
        <p>
        </p>
        <a
          className="App-link"
          href="https://opensea.io/collection/mynft-vavsd1k8eq"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenSea
        </a>
        <a
          className="App-link"
          href="https://polygonscan.com/token/0x6b7c6f3b89778f772f08f35afc221e5308801d94?a=0x6002c313a937c14ff20cb497b0416caa1722330c"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contract address
        </a>

      </header>
    </div>
  );
}

export default App;
