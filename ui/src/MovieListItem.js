import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import MovieListConnection from "./MovieListActConnect";

Modal.setAppElement("#root");

export default function MovieListItem(props) {
    const [actors, setActors] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchActors = async () => {
        const response = await fetch(`/movies/${props.movie.id}/actors`);
        if (response.ok) {
            const data = await response.json();
            setActors(data);
        } else {
            console.error("Failed to fetch assigned actors.");
        }
    };

    useEffect(() => {
        fetchActors();
    }, [props.movie.id]); 

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card movie-card"
        >
            <div className="movie-info">
                <h3>{props.movie.title} ({props.movie.year})</h3>
                <p><strong>Director:</strong> {props.movie.director}</p>
                <p>
                    {expanded ? props.movie.description : `${props.movie.description.slice(0, 80)}... `}
                    {props.movie.description.length > 80 && (
                        <span 
                            className="toggle-description" 
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? "Show less" : "Read more"}
                        </span>
                    )}
                </p>
            </div>

            <div className="actors-list">
                <h4>Actors:</h4>
                {actors.length > 0 ? (
                    <ul>
                        {actors.map(actor => (
                            <li key={actor.id}>
                                🎭 {actor.name} {actor.surname}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No actors assigned yet.</p>
                )}
            </div>
            <button onClick={() => setIsModalOpen(true)} className="toggle-form">
                Assign Actors
            </button>
            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                className="modal"
            >
                <h2>Assign Actors to {props.movie.title}</h2>
                <MovieListConnection 
                    movie={props.movie} 
                    onActorsUpdated={() => {
                        fetchActors();  
                        setIsModalOpen(false); 
                    }} 
                />
                <button onClick={() => setIsModalOpen(false)} className="close-button">
                    Close
                </button>
            </Modal>
            <button onClick={props.onDelete} className="delete-button">❌</button>
        </motion.div>
    );
}
