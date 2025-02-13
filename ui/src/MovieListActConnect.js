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
        props.onActorsUpdated();
    };

    return (
        <div className="movie-connection-container">
            <div className="actor-select-container">
                <Select
                    id="actors-select"
                    options={actorOptions}
                    isMulti
                    placeholder="Choose actors..."
                    onChange={setSelectedActors}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                />
            </div>
            <button onClick={handleAssignActors} className="toggle-form">
                Assign Actors
            </button>
        </div>
    );
}
