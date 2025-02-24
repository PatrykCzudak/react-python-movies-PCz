import MovieListConnection from "./MovieListActConnect";

export default function ConnectionActMovForm(props) {
    return <div>
        <h2>Assign Actors</h2>
        <ul className="movies-list">
            {props.movies.map(movie => <li key={movie.title}>
                <MovieListConnection movie={movie} onUpdateActors={props.onUpdateActors}/>
            </li>)}
        </ul>
    </div>;
}
