import './App.css';
import {useState} from "react";
import "milligram";
import MovieTab from "./MovieTab";
import ActorTab from "./ActorTab";

function App() {
    const [activeTab, setActiveTab] = useState('films');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div className="app-container">
            <div className="tabs">

                <button 
                    className={activeTab === 'films' ? 'active' : ''} 
                    onClick={() => handleTabChange('films')}
                >
                    Films
                </button>
                <button 
                    className={activeTab === 'actors' ? 'active' : ''} 
                    onClick={() => handleTabChange('actors')}
                >
                    Actors
                </button>
                {
                    activeTab === 'films' ? 
                    <MovieTab/>
                    : 
                    <ActorTab/> 
                }
            </div>
        </div>
    );
}

export default App;
