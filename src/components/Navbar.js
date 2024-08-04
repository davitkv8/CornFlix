import { useRef, useEffect } from 'react';
import "./static/nav.css";

export default function Navbar({ onFilterMovies, totalCount }) {
    const inputEl = useRef(null);

    useEffect(function () {
        console.log(inputEl);
        inputEl.current.focus();
    }, []);

    return (
    <nav>
        <div className="logo-container">
            <h1 className="logo">🍿usePopcorn</h1>
        </div>

        <div className="search-bar">
            <input 
                type="text" 
                className="search-input input" 
                placeholder="Search movies..."
                onChange={(e) => onFilterMovies(e.target.value)}
                ref={inputEl}
            />
        </div>

        <div className="count-result">
            <p className="result">
                {totalCount ? (
                    <>
                    Found <strong>{totalCount}</strong> results
                    </>
                ) : (
                    ""
                )}
            </p>
        </div>
    </nav>
    )
}