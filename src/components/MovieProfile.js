import { useState, useEffect } from "react";
import { Stars } from "./Stars";
import "./static/profile.css";
import { useKey } from "./useKey";


export function MovieProfile( { children } ) {
    
    return <>
        {children}
    </>
}

export function MovieHeader( {movie, onGoBack} ) {

    useEffect(function () {
        document.title =  !movie? `cornFlix`: `Movie | ${movie.Title}`;
        return function() {
          document.title = 'cornFlix';
        }
      }, [movie]);

    useKey("Escape", () => onGoBack(null));

    return (
    <>
        <button className="toggle-btn go-back-btn" onClick={() => onGoBack(null)}>&#8592;</button>
        <header className="movie-profile">
        <div className="profile-thumbnail">
            <img className="profile-img" src={movie.Poster} alt={movie.Title}/>
        </div>
        <div className="profile-details">
            <h1 className="title">{ movie.Title }</h1>
            <p className="release">
                { movie.releaseDate } &#x2022; <span className="duration">{movie.Runtime}</span>
            </p>
            <p className="genre">{ movie.Genre }</p>
            <p className="imdb-rating">⭐️ { movie.imdbRating } IMDb rating</p>
        </div>
    </header>
    </>
    )
}

export function MovieSection( { movie, onSubmitRating, isWatched } ) {
    
    const [rating, setRating] = useState(movie.submitedRating);
    
    function submitFeedback() {
        onSubmitRating(movie, rating);
        setRating(0);
    }

    return (
        <section className="profile-section">
            <div className="feedback">
                
                {
                    isWatched?
                    <>
                        <p>You've submited on {movie.submitedRating} stars.</p>
                    </>:
                    <>
                        <Stars maxRating="10" rating={rating} onRating={setRating} />
                        <button className="to-list-btn" onClick={() => submitFeedback()}>+ Add to list</button>
                    </>
                }
            </div>

            <div className="description">
                <p>{movie.Plot}</p>
                <p>
                    Starring - {movie.Actors}
                </p>
                <p>
                    Directed by {movie.Director}
                </p>
            </div>

        </section>
    )
}
