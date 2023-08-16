// search movie

import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key); // getItem
    return storedValue ? JSON.parse(storedValue) : initialState; // JSON.parse
  });

  // updated a watched movie
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value)); // JSON.stringify
    },
    [value, key]
  );
  return [value, setValue];
}
