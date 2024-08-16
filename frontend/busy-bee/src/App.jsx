import './App.css';
// import CountdownButton from './components/CountdownButton/CountdownButton';
import HexGrid from './components/HexGrid/HexGrid.jsx'

function App() {
  return (
    <>
      <div className="app">
        <HexGrid radius={1} />
      </div>
    </>
  );
}

export default App;
