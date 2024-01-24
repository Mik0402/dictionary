import React from "react";
import "./photos.css"

export default function Photos(props) {
    if (props.photos) {
        return (
            <section className="Photos">
                {props.photos.map(function(photo, index) {
                    if (index < 3) {
                    return (
                        <div key={index}>
                            <a href={photo.src.original} target="_blank" rel="noreferrer">
                                <img src={photo.src.landscape} className="img-fluid" alt="word"/>
                            </a>
                        </div>
                    );
                    } else {
                        return null;
                    }
                })}
            </section>
        );
    } else {
        return null;
    }
    
}