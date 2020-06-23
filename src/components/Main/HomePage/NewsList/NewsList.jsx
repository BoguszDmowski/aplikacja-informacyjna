import './NewsList.css';
import React from 'react';
// import NewsCard from './NewsCard';
import Card from './Card';

const NewsList = (props) => (
    <div id ="NewsList">
    {props.articles.map((item) => (
        <Card 
        urlToImage={item.urlToImage} 
        title={item.title}
        description={item.description} 
        url={item.url} 
        name={item.source.name} 
        author={item.author}/>
    ))};
</div>
);

export default NewsList;