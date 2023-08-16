// search movie

import { useState, useEffect } from "react";

const KEY = "f84fc31d";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController(); // clean app fetch | clean app current request each time when new one comes in

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } // clean app current request each time when new one comes in
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies"); // error

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false); // change isLoading back to false
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // handleCloseMovie(); // close current movie if fetch another one

      fetchMovies();

      return function () {
        controller.abort(); // clean app current request each time when new one comes in
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
