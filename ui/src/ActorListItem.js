export default function ActorListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.movie.name}</strong>
                {' '}
                <strong>{props.movie.surname}</strong>
                {' '}
                <a href="#" onClick={props.onDelete}>Delete</a>
            </div>
            {props.movie.description}
        </div>
    );
}
