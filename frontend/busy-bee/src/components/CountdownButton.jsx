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

  return (
    <button onClick={handleReset}>
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

