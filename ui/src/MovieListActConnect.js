import ActorListItem from "./ActorListItem";

export default function MovieListConnection (props) {
    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
            </div>
            <div>
                <label for="movies">Select your favourite movies:</label>
                <select id="movies" name="movies" multiple size="1">
                    <option>

                    </option>
                </select>
            </div>
        </div>
    );
}

