import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

const TickContext = createContext();

export const TickProvider = ({ children, ticksPerSecond = 20 }) => {
  const [tickCount, setTickCount] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  const tickHandlers = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextTickCount = tickCount + gameSpeed;
      setTickCount(nextTickCount);

      tickHandlers.current.forEach(handler => handler(nextTickCount));
    }, 1000 / ticksPerSecond);

    return () => clearInterval(interval);
  }, [ticksPerSecond, gameSpeed, tickCount]);

  const registerTickHandler = (handler) => {
    tickHandlers.current.push(handler);
  };

  return (
    <TickContext.Provider value={{ tickCount, gameSpeed, setGameSpeed, registerTickHandler }}>
      {children}
    </TickContext.Provider>
  );
};

export const useTick = () => useContext(TickContext);