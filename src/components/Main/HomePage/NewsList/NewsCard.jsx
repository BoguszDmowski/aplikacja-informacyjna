import './NewsCard.css';
import React from 'react';

const NewsCard = (props) => (
    <div className="NewsCard">
        <img src={props.urlToImage} alt="" />
        <div className="NewsCard-content">
            <h2>{props.title}</h2>
            <p dangerouslySetInnerHTML= {{__html: props.description}} />
            <div className=".NewsCard-content-footer">
                <p className="description">źródło: {props.name}</p>
                <p className="description">autor: {props.author}</p>
                <a className="description" href={props.url} target="_blank" rel="noopener noreferrer">Zobacz więcej</a>
            </div>
        </div>
    </div>
);

export default NewsCard;