import { useState, useEffect } from "react";
import Select from "react-select";

export default function MovieListConnection(props) {
    const [actors, setActors] = useState([]);
    const [selectedActors, setSelectedActors] = useState([]);
    

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch('/actors/');
            if (response.ok) {
                const data = await response.json();
                setActors(data);
            } else {
                console.error("Failed to fetch actors.");
            }
        };
        fetchActors();
    }, []);

    // Format actors for react-select
    const actorOptions = actors.map(actor => ({
        value: actor.id,
        label: `${actor.name} ${actor.surname}`,
    }));


    const handleAssignActors = async () => {
        for (const actor of selectedActors) {
            const response = await fetch(`/movies/${props.movie.id}/actors`, {
                method: "POST",
                body: JSON.stringify({ id: actor.value }),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                console.error(`Failed to assign actor ${actor.label} to movie ${props.movie.title}`);
            }
        }
        alert("Actors assigned successfully!");
    };

    return (
        <div className="movie-connection-container">
            <div className="movie-info">
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
            </div>
            <div className="actor-select-container">
                <Select
                    id="actors-select"
                    options={actorOptions}
                    isMulti
                    placDXeholder="Choose actors..."
                    onChange={setSelectedActors}
                    
                />
            </div>
            <button onClick={handleAssignActors} className="toggle-form">
                Assign Actors
            </button>
        </div>
    );
}

