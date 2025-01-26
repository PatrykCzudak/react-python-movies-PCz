import { useState } from "react";

export default function SearchTab() {
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (query.trim() === "") {
            setResults([]); // Clear results if input is empty
            return;
        }

        try {
            const response = await fetch("/search/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, limit }),
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data || []);
            } else {
                console.error("Failed to fetch search results.");
                setResults([]);
            }
        } catch (error) {
            console.error("Error occurred while searching:", error);
            setResults([]);
        }
    };
    console.log("Results state:", results);
    return (
          <div className="search-tab">
          <h1>Search</h1>
          <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Type your search here..."
                    className="search-input"
                />
                <input
                    type="number"
                    value={limit}
                    onChange={(event) => setLimit(Number(event.target.value))}
                    placeholder="Limit"
                    className="limit-input"
                    min="1"
                />
                <button onClick={handleSearch} className="toggle-button">Search</button>
          </div>
          <div className="search-results">
              <h3>Results for {query}</h3>
              <ul>
                  {results.map((result, index) => (
                      <li key={index}>
                          <strong>{result.title}</strong> ({result.year})
                          <br />
                          Directed by: {result.director}
                          <br />
                          {result.description}
                      </li>
                  ))}
              </ul>
          </div>
      </div>
    );
}
