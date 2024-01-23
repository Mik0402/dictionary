import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./dictionary.css";

export default function Dictionary(props) {
    let [keyword, setKeyword] = useState(props.defaultKeyword);
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);

    function handleResponse(response) {
        setResults(response.data[0]);
    }

    function search() {
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleKeywordChange(event) {
        setKeyword(event.target.value);
    }

    function load() {
        setLoaded(true);
        search();
    }

    if (loaded) {
    return (
        <div className="dictionary">
            <div className="text-center">
            <h1>📚 Dictionary</h1>
            </div>
            <section>
            <h2>What word do you want to look up?</h2>
            <form onSubmit={handleSubmit}>
             <input type="search" autoFocus={true} placeholder=' Search' onChange={handleKeywordChange} defaultValue={props.defaultKeyword} />
            </form>
            <div className="hint">
                suggested words: sunset, wine, dance, tree, etc.
            </div>
            </section>
            
            <Results results={results} />
        </div>
    );
    } else {
        load();
        return "Loading...";
    }
}