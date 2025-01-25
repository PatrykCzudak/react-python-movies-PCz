import ActorListItem from "./ActorListItem";

export default function ActoresList(props) {
    return <div>
        <h2>Actores</h2>
        <ul className="movies-list">
            {props.actors.map(movie => <li key={movie.title}>
                <ActorListItem movie={movie} onDelete={() => props.onDeleteMovie(movie)}/>
            </li>)}
        </ul>
    </div>;
}
