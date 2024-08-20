import React, { createContext, useState, useEffect, useContext } from 'react';

const TickContext = createContext();

export const TickProvider = ({ children, ticksPerSecond = 20 }) => {
  const [tickCount, setTickCount] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickCount(prevCount => prevCount + gameSpeed);
    }, 1000 / ticksPerSecond);

    return () => clearInterval(interval);
  }, [ticksPerSecond, gameSpeed]);

  return (
    <TickContext.Provider value={{ tickCount, gameSpeed, setGameSpeed }}>
      {children}
    </TickContext.Provider>
  );
};

export const useTick = () => useContext(TickContext);