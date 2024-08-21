import './App.css';
// import CountdownButton from './components/CountdownButton/CountdownButton';
import HexGrid from './components/HexGrid/HexGrid.jsx'
import { TickProvider } from './context/TickContext.jsx';

function App() {
  return (
    <TickProvider>
      <HexGrid radius={3} />
    </TickProvider>
  );
}

export default App;
