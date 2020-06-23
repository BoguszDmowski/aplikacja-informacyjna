import React, {useState} from 'react';
import { BrowserRouter} from 'react-router-dom';
import './App.css';
import Header from'./components/Header/Header';
import Main from'./components/Main/Main';
import Footer from'./components/Footer/Footer';
import LanguageContext from './languageContext';
import 'semantic-ui-css/semantic.min.css'



const App = () => {
  const [lang, setLang] =useState('pl');
  console.log(lang)

  return (
    <BrowserRouter>
      <LanguageContext.Provider value={lang}>
        <Header onLanguageChange={setLang}/>
        <Main/>
        <Footer/>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

export default App;
