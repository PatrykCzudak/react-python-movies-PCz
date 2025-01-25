import './App.css';
import {useState, useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

function FilmTab() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);


    async function handleAddMovie(movie) {
        const response = await fetch('/movies/', {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          setMovies([...movies, movie]);
          setAddingMovie(false);
        }
      }

    async function handleDelMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
            const nextMovies = movies.filter(m => m !== movie);
            setMovies(nextMovies);
        }
      }

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies/`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();
    }, []);

    function openAddFilm() {
        setAddingMovie(!addingMovie)
      }

    return (
        <div>
            <h1>My favourite movies to watch</h1>
            {
                movies.length === 0 ? 
                <p>No movies yet. Maybe add something?</p> 
                : 
                <MoviesList movies={movies} onDeleteMovie={handleDelMovie}/>
            }
            <button type="button" className="toggle-form" onClick={openAddFilm}>{addingMovie ? "Hide Form" : "Add a movie"}</button>
            {addingMovie && <MovieForm onMovieSubmit={handleAddMovie} buttonLabel="Add a movie"/>}
        </div>

    );
}

export default FilmTab;
