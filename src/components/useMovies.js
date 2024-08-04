import { useState, useEffect } from "react";
import { getApiUrlWithFilterExtension } from "../helpers.js";

export function useMovies( query ) {

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchMovies() {
            if (!query) return setFilteredMovies([]);
            if (query.length < 5 || query.endsWith(' ')) return;

            setIsLoading(true);
            const url = getApiUrlWithFilterExtension("any", query);
            const resp = await fetch(url);
            const data = await resp.json();

            if (data.Response === "False") {
                setError(`⛔ ${data.Error}`);
              } else {
                setFilteredMovies(data.Search);
                setError(null);
              }
            
            setIsLoading(false);
        }
        fetchMovies();
    }, [query]);

    return { filteredMovies, isLoading, error }
    
}

