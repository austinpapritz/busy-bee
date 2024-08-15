import './CountdownButton.css'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


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

  const getButtonClass = () => {
    if (count > 15) return 'glow-green';
    if (count <= 15 && count > 10) return 'glow-yellow';
    if (count <= 10 && count > 5) return 'glow-orange';
    if (count <= 5 && count > 0) return 'glow-red';
    return '';
  };

  return (
    <button onClick={handleReset} className={`countdown-button ${getButtonClass()}`}>
      {count}
    </button>
  );
};

// PropTypes validation
CountdownButton.propTypes = {
  initialCount: PropTypes.number
};

// Default props
CountdownButton.defaultProps = {
  initialCount: 10
};

export default CountdownButton;

