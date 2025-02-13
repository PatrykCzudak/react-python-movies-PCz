import './App.css';
import {useState} from "react";
import "milligram";
import MovieTab from "./MovieTab";
import ActorTab from "./ActorTab";
import SearchTab from "./SearchTab";

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
                <div className="tooltip-container">
                    <button 
                        className="disabled-button" 
                        disabled
                    >
                        Search
                    </button>
                    <span className="tooltip">Not available on this platform</span>
                </div>
                {
                    activeTab === 'films' ? 
                    <MovieTab/>
                    : 
                    activeTab === 'actors' ? 
                    <ActorTab/>
                    :
                    <SearchTab/>
                }
            </div>
        </div>
    );
}

export default App;
