import './HobbbyPage.css';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import LanguageContext from '../../languageContext';

import 'react-datepicker/dist/react-datepicker.css';
import NewsList from './HomePage/NewsList/NewsList';
import { Pagination } from 'semantic-ui-react'


const sortByOptions = [
    { value: 'publishedAt', name: 'Publish date'},
    { value: 'relevancy', name: 'Relevancy'},
    { value: 'popularity', name: 'Popularity'}
]

const layoutType = {
    MOBILE: `MOBILE`,
    LANDSCAPE: `LANDSCAPE`
};

const getLayoutType = () => {
    if (window.innerWidth < 768) return layoutType.MOBILE;
    else return layoutType.LANDSCAPE;
}
const HobbyPage = () => {
    const [startDate, setStartDate] = useState(moment().subtract(1, 'months').toDate());
    const [endDate, setEndDate] = useState(moment().toDate());
    const [sortBy, setSortBy] = useState(sortByOptions[0].value);
    const [results, setResults] = useState(null);
    const lang = useContext(LanguageContext);
    const onChange = event => setSortBy(event.target.value);

    const [page, setPage] = useState(1);

   
    const onPageChange= (event, data) => setPage(data.activePage);


    const fetchArticles = useCallback(() => {
        if (startDate>endDate) return alert('start date is grater than end date');

        fetch(`http://localhost:4000/hobby?language=${lang}&page=${page}&from=${startDate.toISOString()}&to=${endDate.toISOString()}&sortBy=${sortBy}`)
            .then((response) => response.json())
            .then((res) =>setResults(res));
    }, [startDate, endDate, lang, sortBy, page]);

    useEffect(() => { fetchArticles(); }, [fetchArticles]);
    
    const [layoutType, setLayoutType] = useState(getLayoutType());
    console.log(layoutType);


    useEffect(() =>{
        const onResize = () => {
            const currentLayoutType = getLayoutType();
            if (currentLayoutType !== layoutType) setLayoutType(currentLayoutType);
        };
        window.addEventListener('resize', onResize); 

        return () => window.removeEventListener('resize', onResize);
    }, [layoutType]);
    
    return (
        <div className="HobbyPage">
            <div>
                <label> Start Date:</label>
                <DatePicker selected={startDate} maxDate={(moment().toDate())} onChange={setStartDate} dateFormat="dd-MM-yyyy"/>

            </div>
            <div>
                <label> End Date:</label>
                <DatePicker selected={endDate} maxDate={(moment().toDate())} onChange={setEndDate} dateFormat="dd-MM-yyyy"/>
            </div>
            {layoutType !== layoutType.LANDSCAPE ? 
                <>
                    <label> Sort by:</label>
                    <select onChange={onChange}>
                        {sortByOptions.map(({value, name}) =>(
                            <option key={Math.random()} value={value}> {name}</option>
                        ))}
                    </select>
                </>
             : null}
            {results ? (<NewsList key={`${startDate}${endDate}`} articles={results.articles.sort((a, b) => a.publishedAt > b.publishedAt)} />) : null}
            {results && results.totalResults ? <Pagination  
                    defaultActivePage={1}
                    totalPages={Math.ceil(results.totalResults / 20)}
                    onPageChange={onPageChange}/>
            : null}
        
        </div>
    );
};
export default HobbyPage

