import {useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');

    function addMovie(event) {
        event.preventDefault();
        if (year === "") {
            return alert("Insert year!!!")
        } else if (title === "") {
            return alert("Insert title!!!")
        } else if (title.length < 4) {
            return alert("Title is to short.")
        } else if (title.length < 50) {
            props.onMovieSubmit({title, year});
            setTitle('');
            setYear('');
            setDirector('');
            setDescription('');
        } else {
            return alert("Title is to long")
        };
        props.onMovieSubmit({title, year, director, description});
    }

    return (
        <dir className="form-container">
            <form onSubmit={addMovie}>
                <h2 className="form-header">Add movie</h2>
                <div className="form-group"> 
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-input" value={title} onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="text" className="form-input" value={year} onChange={(event) => setYear(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="director" className="form-label">Director</label>
                    <input type="text" className="form-input" value={director} onChange={(event) => setDirector(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea value={description} className="form-input" onChange={(event) => setDescription(event.target.value)}/>
                </div>
                <button>{props.buttonLabel || 'Submit'}</button>
            </form>;
        </dir>
    )
}
