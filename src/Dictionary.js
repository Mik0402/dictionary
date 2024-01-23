import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./dictionary.css";

export default function Dictionary(props) {
    let [keyword, setKeyword] = useState(props.defaultKeyword);
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);

    function handleDictionaryResponse(response) {
        setResults(response.data[0]);
    }

    function handlePexelResponse(response) {
        console.log(response);
    }

    function search() {
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiUrl).then(handleDictionaryResponse);

        let pexelsApiKey ="h8EH1BNqymVafp0MwsFzYx2VO9Vvxzrt5Iot4NF46MIPCOacRbDWbFFN";
        let pexelsApiUrl =`https://api.pexels.com/v1/search?query=${keyword}&per_page=1`;
        let headers = { Authorization : `Bearer ${pexelsApiKey}` };
        axios.get(pexelsApiUrl, { headers: headers })
    .then(handlePexelResponse);
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
            <div className="row">
                <div className="col-6">
            <Results results={results} />
            </div>
            </div>
        </div>
    );
    } else {
        load();
        return "Loading...";
    }
}