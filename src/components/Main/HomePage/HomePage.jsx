import React from 'react';
import NewsList from './NewsList/NewsList';
import NewsFiltersBar from './NewsFiltersBar/NewsFiltersBar';
import './HomePage.css';
import LanguageContext from '../../../languageContext'
import { Pagination } from 'semantic-ui-react'


class HomePage extends React.Component {

    static contextType = LanguageContext;
    
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            categoty: null,
            lang: { lang: this.context},
            page: 1,
        }
    }

    componentDidMount() {    
        this.getArticles();
        // this.setState({ lang: this.context});    
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (prevState.category !== this.state.category || prevState.lang !== this.state.lang) this.getArticles();

        if (prevState.lang !== this.context) this.setState({ lang: this.context});
        if (prevState.phrase !== this.state.phrase) this.getArticles();
        if (prevState.page !== this.state.page) this.getArticles();
    }
    
    getArticles () {
        console.log(this.context);
        const {category, lang, phrase, page} = this.state;
        const query = category ? `&category=${category}` : '';
        const queryWithPhrase = phrase ? `${query}&q=${phrase}` : query;
        const queryWithPage= page 
            ? `${queryWithPhrase}&page=${page}` 
            : queryWithPhrase; 

        fetch(`http://localhost:4000/articles?page=${page}&country=${lang}${queryWithPage}`)
            .then((response) =>response.json())
            .then(results =>  this.setState({results}));
    }

    setCategory= (category) => this.setState({ category});
    setSearchPhrase = (e) => {
        const phrase = e.target.value;
        if (phrase.length >= 3) this.setState({ phrase});
        if (!phrase || phrase === "") this.setState ({phrase: null});
    };
    onPageChange = (e, {activePage}) => {
        this.setState({page: activePage})
        console.log(activePage)
    }
    render(){
        const { results} = this.state;

        if (!results) return null;

        return (
            <div id ="HomePage">
                <NewsFiltersBar onCategoryChange={this.setCategory} onSearchPhraseChange= {this.setSearchPhrase}/>
                <NewsList articles={results.articles}/>
                
                {results && results.totalResults ? (
                    <Pagination
                        defaultActivePage={1}
                        totalPages={Math.ceil(results.totalResults / 20)}
                        onPageChange={this.onPageChange}
                    />
                ): null }
            </div>
        )
    }
};


export default HomePage