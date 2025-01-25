import './App.css';
import {useState, useEffect} from "react";
import "milligram";
import ActorForm from "./ActorForm";
import ActoresList from "./ActorList";

function ActorTab() {
    const [actors, setActors] = useState([]);
    const [addingActor, setAddingActor] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleAddActor(actor) {
        const response = await fetch('/actors/', {
          method: 'POST',
          body: JSON.stringify(actor),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          setActors([...actors, actor]);
          setAddingActor(false);
        }
      }

    async function handleDelActor(actor) {
        const response = await fetch(`/actors/${actor.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
            const nextActors = actors.filter(m => m !== actor);
            setActors(nextActors);
        }
      }

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch(`/actors/`);
            if (response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
        };
        fetchActors();
    }, []);

    function openAddFilm() {
      setAddingActor(!addingActor)
      }

    return (
        <div>
            <h1>My favourite actors</h1>
            {
                actors.length === 0 ? 
                <p>You dont like anyone</p> 
                : 
                <ActoresList actors={actors} onDeleteActor={handleDelActor}/>
            }
            <button type="button" className="toggle-form" onClick={openAddFilm}>{addingActor ? "Hide Form" : "Add actor"}</button>
            {addingActor && <ActorForm onActorSubmit={handleAddActor} buttonLabel="Add actor"/>}
        </div>

    );
}

export default ActorTab;
