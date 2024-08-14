import './App.css';
import CountdownButton from './components/CountdownButton';

function App() {
  return (
    <>
      <div className="card">
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={20} />
      </div>
    </>
  );
}

export default App;
