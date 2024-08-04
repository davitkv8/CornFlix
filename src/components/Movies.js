import { sum } from "../helpers"; 

export function MoviesList( { children } ) {
    return <ul className="movies-list">
        { children }
    </ul>
}

export function Movies( {movies, onSelectMovie} ) {

    function getFullYearFromStr(dateStr) {
        const date = new Date(dateStr);
        return date.getFullYear();
    }

    return (
        <ul className="movies-list">
            {movies.map((movie) => (
            <li key={movie.imdbID} className="movie" onClick={() => onSelectMovie(movie)}>
                <div className="movie-thumbnail">
                    <img className="movie-img" src={movie.Poster} alt={movie.movieName}/>
                </div>
                <div className="movie-details">
                    <h2 className="movie-title">{movie.Title}</h2>
                    <p className="release-date">🗓 {getFullYearFromStr(movie.Year)}</p>
                </div>
            </li>
            ))}
        </ul>
    )
}

export function WatchedMovies( { movies, onRemoveMovie } ) {

    function getStats() {
        const totalMovies = movies.length;
        if (!totalMovies) return [0, 0, 0, 0];

        const imbdRatingAverage = (sum(movies.map((movie) => Number(movie.imdbRating))) / totalMovies).toFixed(1);
        const sumbitedRatingAverage = (sum(movies.map((movie) => movie.submitedRating)) / totalMovies).toFixed(1);
        const durationAverage = Math.round(sum(movies.map((movie) => Number(movie.Runtime.split(" ")[0]))) / totalMovies);

        return [totalMovies, imbdRatingAverage, sumbitedRatingAverage, durationAverage];
    }

    const [totalMovies, imbdRatingAverage, sumbitedRatingAverage, durationAverage] = getStats();

    return <>
    <div className="summary">
        <div className="section-title">
            <h2>MOVIES YOU WATCHED</h2>
        </div>
        <div className="stats">
            <p>#️⃣ {totalMovies} movies</p>
            <p>⭐️ {imbdRatingAverage}</p>
            <p>🌟 {sumbitedRatingAverage}</p>
            <p>⏳ {durationAverage} min</p>
        </div>
    </div>

    <ul className="movies-list">
        {movies.map((movie) => (
            <li key={movie.imdbID} className="movie">
                <div className="movie-thumbnail">
                    <img className="movie-img" src={movie.Poster} alt={movie.Title}/>
                </div>
                <div className="movie-details">
                    <h2 className="movie-title">{movie.Title}</h2>
                    <div className="more-info">
                        <p className="movie-rating">⭐️ {movie.imdbRating}</p>
                        <p className="movie-feedback">🌟 {movie.submitedRating}</p>
                        <p className="movie-duration">⏳ {movie.Runtime}</p>
                    </div>
                </div>
                <button className="toggle-btn remove-btn" onClick={() => onRemoveMovie(movie.imdbID)}>X</button>
            </li>
        ))}
    </ul>

    </>
}
