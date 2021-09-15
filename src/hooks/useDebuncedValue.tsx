/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
const useDebuncedValue = (input: string = '', time: number = 500) => {
  const [debuncedValue, setDebuncedValue] = useState<string>(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebuncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return { debuncedValue };
};

export default useDebuncedValue;
