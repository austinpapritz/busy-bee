import './App.css';
import BusyBeeGame from './components/canvas/BusyBeeGame.jsx';
// import CountdownButton from './components/CountdownButton/CountdownButton';
// import HexGrid from './components/hex-grid/HexGrid.jsx'
import { TickProvider } from './context/TickContext.jsx';

function App() {
  return (
    <TickProvider>
      {/* <HexGrid /> */}
      <BusyBeeGame />
    </TickProvider>
  );
}

export default App;
