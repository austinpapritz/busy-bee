import './App.css';
import CountdownButton from './components/CountdownButton/CountdownButton';

function App() {
  return (
    <>
      <div className="card">
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={20} />
        <CountdownButton initialCount={60} />
        <CountdownButton initialCount={50} />
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={20} />
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={15} />
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={20} />
        <CountdownButton initialCount={20} />
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={10} />
        <CountdownButton initialCount={20} />
      </div>
    </>
  );
}

export default App;
