import ActorListItem from "./ActorListItem";

export default function ActoresList(props) {
    return <div>
        <h2>Actores</h2>
        <ul className="movies-list">
            {props.actors.map(actor => <li key={actor.title}>
                <ActorListItem actor={actor} onDelete={() => props.onDeleteActor(actor)}/>
            </li>)}
        </ul>
    </div>;
}
