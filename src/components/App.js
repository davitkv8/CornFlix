import { useState } from "react";
import Section from "./Section.js";
import Navbar from "./Navbar";
import Box from "./Box.js";
import { Movies, WatchedMovies } from "./Movies.js";
import { MovieProfile, MovieHeader, MovieSection } from "./MovieProfile.js";
import { getApiUrlWithFilterExtension } from "../helpers.js";
import { Loader } from "./Loader.js";
import { Error } from "./Error.js";
import { useMovies } from "./useMovies.js";
import { useLocalStorage } from "./useLocalStorage.js";


function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("interstellar");
  const [watchedMovies, setWatchedMovies] = useLocalStorage([]);

  const { filteredMovies, isLoading, error } = useMovies(query, [query]);

  function updateSelectedMovie( movie ) {
    const url = getApiUrlWithFilterExtension("title", movie.Title);

    fetch(url).then((res) => res.json()).then((data) => {
      setSelectedMovie(data);
    });

  }

  function submitMovieRview(movie, rating) {
    const reviewedMovie = { ...movie };
    reviewedMovie.submitedRating = rating;
    setWatchedMovies((c) => ([...c, reviewedMovie]))
  }

  function removeWatchedMovie(movieID) {
    const filteredOutMovies = watchedMovies.filter((movie) => movie.imdbID !== movieID);
    setWatchedMovies(filteredOutMovies);
  }

  const watchedMoviesID = watchedMovies.map((movie) => movie.imdbID);
  const isSelectedMovieWatched = selectedMovie? watchedMoviesID.includes(selectedMovie.imdbID): false;


  return <>
    <Navbar onFilterMovies={setQuery} totalCount={filteredMovies.length}/>
    <Section>

      <Box>
        {isLoading? <Loader/>: error? <Error msg={error}/>: <Movies movies={filteredMovies} onSelectMovie={updateSelectedMovie}/>}
      </Box>
      
      <Box>
        {
          selectedMovie?

          <MovieProfile>
            <MovieHeader movie={selectedMovie} onGoBack={setSelectedMovie}/>
            <MovieSection movie={selectedMovie} onSubmitRating={submitMovieRview} isWatched={isSelectedMovieWatched} />
          </MovieProfile>: 

          <WatchedMovies movies={watchedMovies} onRemoveMovie={removeWatchedMovie}/>
        }
      </Box>

    </Section>
  </>;
}

export default App;
