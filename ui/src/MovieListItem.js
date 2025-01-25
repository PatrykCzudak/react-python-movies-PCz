import { useState, useEffect } from "react";

export default function MovieListItem(props) {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch(`/movies/${props.movie.id}/actors`);
            if (response.ok) {
                const data = await response.json();
                setActors(data);
            } else {
                console.error("Failed to fetch assigned actors.");
            }
        };
        fetchActors();
    }, [props.movie.id]);

    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                <a href="#" onClick={props.onDelete}>Delete</a>
            </div>
            {props.movie.description}
            <div style={{ marginTop: "10px" }}>
                <h4>Actors:</h4>
                {actors.length > 0 ? (
                    <ul>
                        {actors.map(actor => (
                            <li key={actor.id}>
                                {actor.name} {actor.surname}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No actors assigned yet.</p>
                )}
            </div>
        </div>
    );
};
