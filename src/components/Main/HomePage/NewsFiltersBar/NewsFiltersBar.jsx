import React from 'react';
import PropTypes from 'prop-types';
import CategoryDropdown from "./CategoryDropdown";
import './NewsFiltersBar.css';


const NewsFiltersBar = (props)=> (
    <div id = "NewFiltersBar">
        <CategoryDropdown 
            onCategoryChange={props.onCategoryChange}
            cartegory={props.category}
        />
        <input id='search-phrase-input' onChange={props.onSearchPhraseChange} />
    </div>
);

NewsFiltersBar.propTypes = {
    onCategoryChange: PropTypes.func.isRequired,
    onSearchPhraseChange: PropTypes.func.isRequired,
};

export default NewsFiltersBar;