import React, { useState } from "react";
import axios from "axios";
import "./dictionary.css";

export default function Dictionary() {
    let [keyword, setKeyword] = useState("");

    function handleResponse(response) {
        console.log(response);
    }

    function search(event) {
        event.preventDefault();

        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleKeywordChange(event) {
        setKeyword(event.target.value);
    }

    return (
        <div className="dictionary text-center">
            
            <h1>📚 Dictionary</h1>
            <h2>What word do you want to look up?</h2>
            <form onSubmit={search}>
        <input type="search" autoFocus={true} placeholder=' Search' onChange={handleKeywordChange} />
        <button type="Submit" className="btn btn-primary">Search</button>
        </form>
        </div>
    );
}