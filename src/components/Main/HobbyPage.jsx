import './HobbbyPage.css';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import LanguageContext from '../../languageContext';

import 'react-datepicker/dist/react-datepicker.css';
import NewsList from './HomePage/NewsList/NewsList';
import { Pagination } from 'semantic-ui-react'

const PaginationExamplePagination = (results, onPageChange) => (
    <Pagination
    defaultActivePage={1}
    totalPages={Math.ceil(results.totalResults / 20)}
    // onPageChange={this.onPageChange}
/>
)

const sortByOptions = [
    { value: 'publishedAt', name: 'Publish date'},
    { value: 'relevancy', name: 'Relevancy'},
    { value: 'popularity', name: 'Popularity'}
]

const layoutType = [
    {value: 'land', name: `Landscape`},
    {value: 'land', name: `Landscape`}
]
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

    const [state, setState] = useState(1);
    // const [totalPages, setTotalPages] = Math.celi(results.totalResults / 20);

   
    const onPageChange= event => setState(event.target.value);
    
    // onPageChange = (e, {activePage}) => {
    //     this.setState({page: activePage})
    //     console.log(activePage)
    // } totalPages={Math.ceil(results.totalResults / 20)}


    const fetchArticles = useCallback(() => {
        if (startDate>endDate) return alert('start date is grater than end date');

        fetch(`http://localhost:4000/hobby?language=${lang}&from=${startDate.toISOString()}&to=${endDate.toISOString()}&sortBy=${sortBy}`)
            .then((response) => response.json())
            .then((res) =>setResults(res));
    }, [startDate, endDate, lang, sortBy]);

    useEffect(() => { fetchArticles(); }, [fetchArticles]);
    
    const [LayoutType, setLayoutType] = useState(getLayoutType());
    console.log(layoutType);


    useEffect(() =>{
        const onResize = () => {
            const currentLayoutType = getLayoutType();
            if (currentLayoutType !== layoutType) setLayoutType(currentLayoutType);
            console.log(window.innerWidth)
        };
        window.addEventListener('resize', onResize); 

        return () => window.removeEventListener('resize', onResize);
    }, [LayoutType]);

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
            {layoutType !== layoutType.MOBILE ? (
            <div>
                <label> Sort by:</label>
                <select onChange={onChange}>
                    {sortByOptions.map(({value, name}) =>(
                        <option value={value}> {name}</option>
                    ))}
                </select>
            </div>
            ) : null}
            {results ? (<NewsList key={`${startDate}${endDate}`} articles={results.articles.sort((a, b) => a.publishedAt > b.publishedAt)} />) : null}
            {results ? PaginationExamplePagination(<NewsList articles={results.articles} /> ): null}
        </div>
    );
};
export default HobbyPage

//     totalPages={Math.ceil(results.totalResults / 20)}
// onPageChange={this.onPageChange}