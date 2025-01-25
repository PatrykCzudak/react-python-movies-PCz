import {useState} from "react";

export default function ActorForm(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');


    function addActor(event) {
        event.preventDefault();
        if (name === "") {
            return alert("Insert name!!!")
        } else if (surname === "") {
            return alert("Insert surneme!!!")
        } else {
            props.onActorSubmit({name, surname});
            setName('');
            setSurname('');
        };
        props.onActorSubmit({name, surname});
    }

    return (
        <dir className="form-container">
            <form onSubmit={addActor}>
                <h2 className="form-header">Add actor</h2>
                <div className="form-group"> 
                    <label htmlFor="title" className="form-label">Name</label>
                    <input type="text" className="form-input" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="year" className="form-label">Surname</label>
                    <input type="text" className="form-input" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                </div>
                <button>{props.buttonLabel || 'Submit'}</button>
            </form>;
        </dir>
    )
}
