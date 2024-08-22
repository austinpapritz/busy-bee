import './App.css';
// import CountdownButton from './components/CountdownButton/CountdownButton';
import HexGrid from './components/hex-grid/HexGrid.jsx'
import { TickProvider } from './context/TickContext.jsx';

function App() {
  return (
    <TickProvider>
      <HexGrid />
    </TickProvider>
  );
}

export default App;
