import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./dictionary.css";

export default function Dictionary(props) {
    let [keyword, setKeyword] = useState(props.defaultKeyword);
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);
    let [photos, setPhotos] = useState(null);

    function handleDictionaryResponse(response) {
        setResults(response.data[0]);
    }

    function handleImageResponse(response) {
        setPhotos(response.data.photos);
    }

    function search() {
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiUrl).then(handleDictionaryResponse);

        let imagesApiKey ="13926dce13oc4b425t4aaa2e80fe149a";
        let imagesApiUrl =`https://api.shecodes.io/images/v1/search?query=${keyword}&key=${imagesApiKey}`;
        axios.get(imagesApiUrl)
    .then(handleImageResponse);
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
                <div className="col-6">
                <Photos photos={photos} />
                </div>
            </div>
        </div>
    );
    } else {
        load();
        return "Loading...";
    }
}