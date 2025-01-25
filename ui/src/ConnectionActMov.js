import MovieListConnection from "./MovieListActConnect";

export default function ConnectionActMovForm(props) {
    return <div>
        <h2>Connect Actors to Movies</h2>
        <ul className="movies-list">
            {props.movies.map(movie => <li key={movie.title}>
                <MovieListConnection movie={movie}/>
            </li>)}
        </ul>
    </div>;
}
