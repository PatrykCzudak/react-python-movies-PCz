import { useState, useEffect } from "react";
import Modal from "react-modal";
import ActorForm from "./ActorForm";
import ActorListItem from "./ActorListItem";

Modal.setAppElement("#root");

function ActorTab() {
    const [actors, setActors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch(`/actors/`);
            if (response.ok) {
                const data = await response.json();
                setActors(data);
            } else {
                console.error("Failed to fetch actors.");
            }
        };
        fetchActors();
    }, []);

    async function handleAddActor(actor) {
        const response = await fetch('/actors/', {
            method: 'POST',
            body: JSON.stringify(actor),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const newActor = await response.json();
            setActors([...actors, newActor]);
            setIsModalOpen(false);
        }
    }

    async function handleDeleteActor(actor) {
        const response = await fetch(`/actors/${actor.id}`, { method: 'DELETE' });

        if (response.ok) {
            setActors(actors.filter(a => a.id !== actor.id));
        } else {
            console.error("Failed to delete actor.");
        }
    }

    return (
        <div>
            <h1>My Favourite Actors</h1>
            <button onClick={() => setIsModalOpen(true)} className="toggle-form">Add Actor</button>

            <div className="actor-list">
                {actors.length === 0 ? (
                    <p>No actors added yet.</p>
                ) : (
                    actors.map(actor => (
                        <ActorListItem key={actor.id} actor={actor} onDelete={() => handleDeleteActor(actor)} />
                    ))
                )}
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal">
                <h2>Add Actor</h2>
                <ActorForm onActorSubmit={handleAddActor} buttonLabel="Add Actor" />
                <button onClick={() => setIsModalOpen(false)} className="close-button">Close</button>
            </Modal>
        </div>
    );
}

export default ActorTab;
