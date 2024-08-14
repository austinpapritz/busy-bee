// src/components/CountdownButton.jsx
import { useState, useEffect } from 'react';

const CountdownButton = ({ initialCount = 10 }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count]);

  const handleReset = () => {
    setCount(initialCount);
  };

  return (
    <button onClick={handleReset}>
      {count}
    </button>
  );
};

export default CountdownButton;
