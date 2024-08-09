import {useState, useEffect} from 'react'

const useDebounce = (input = "", duration = 700) => {
  const [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceValue(input);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [input, duration]);

  return debounceValue
};

export default useDebounce;