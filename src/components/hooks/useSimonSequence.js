import { useState, useCallback } from 'react';

const useSimonSequence = () => {
  const colors = ['red', 'green', 'blue', 'yellow'];
  const [gameSequence, setGameSequence] = useState([]);

  const generateNextColor = useCallback(() => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    setGameSequence((prev) => [...prev, nextColor]);
  }, []);

  const resetSequence = useCallback(() => {
    setGameSequence([]); // Reinicia la secuencia
  }, []);

  return { gameSequence, generateNextColor, resetSequence };
};

export default useSimonSequence;
