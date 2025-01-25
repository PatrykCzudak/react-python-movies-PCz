import { useState, useEffect } from "react";

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
                <label for="movies">Select actors!@:</label>
                <select id="actors" name="actors" multiple size="1">
                    <option>

                    </option>
                </select>
            </div>
        </div>
    );
}

