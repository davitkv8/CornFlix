import {useEffect, useState} from "react";

export function useLocalStorage(initialValue) {
    const [watchedMovies, setWatchedMovies] = useState(function () {
        const data = localStorage.getItem('watchedMovies');
        return JSON.parse(data) || initialValue;
      });

      useEffect(function () {
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      }, [watchedMovies]);

    return [watchedMovies, setWatchedMovies];
}