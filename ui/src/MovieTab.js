import './App.css';
import {useState, useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import Modal from "react-modal";
import MoviesList from "./MoviesList";

function MovieTab() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    async function handleAddMovie(movie) {
        const response = await fetch('/movies/', {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          setMovies([...movies, movie]);
          setAddingMovie(false);
          setIsModalOpen(false);
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
        setIsModalOpen(false);
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
            <div>
              <button type="button" className="toggle-form" onClick={() => setIsModalOpen(true)}>Add a movie</button>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                className="modal"
            >
                <h2>Add a New Movie</h2>
                <MovieForm onMovieSubmit={handleAddMovie} buttonLabel="Add a movie"/>
                <button onClick={() => setIsModalOpen(false) } className="close-button">
                    Close
                </button>
            </Modal>
            {
                movies.length === 0 ? 
                <p>No movies yet. Maybe add something?</p> 
                : 
                <MoviesList movies={movies} onDeleteMovie={handleDelMovie}/>
            }
        </div>

    );
}

export default MovieTab;
