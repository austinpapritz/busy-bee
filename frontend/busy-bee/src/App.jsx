import './App.css';
import BusyBeeGame from './components/GameCanvas/GameCanvas.jsx';
// import CountdownButton from './components/CountdownButton/CountdownButton';
import { TickProvider } from './context/TickContext.jsx';

function App() {
  return (
    <TickProvider>
      <BusyBeeGame />
    </TickProvider>
  );
}

export default App;
