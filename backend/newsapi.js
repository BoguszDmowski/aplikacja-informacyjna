const superagent = require('superagent');

const NEWS_API_URL = 'https://newsapi.org/v2';
const TOP_HEADLINES_ENDPOINT_PATH = '/top-headlines';
const API_KEY ='7fd6a19746cf4bad855d0c91695e5c68';

const EVERYTHING_ENDPOINT_PATH = '/everything';

const getMainArticles = (query) => superagent
    .get(`${NEWS_API_URL}${TOP_HEADLINES_ENDPOINT_PATH}`)
    .query({country: 'pl',...query,  apiKey: API_KEY});
 
const getHobbyNews = (query) => superagent
.get(`${NEWS_API_URL}${EVERYTHING_ENDPOINT_PATH}`)
.query({ language: 'pl',...query, apiKey: API_KEY, q: 'hobby'});


module.exports ={
    getMainArticles,
    getHobbyNews,
};