import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import HobbyPage from './HobbyPage';
import HelpPage from './HelpPage';
import './Main.css';

const Main = () =>
    <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/Hobby">
            <HobbyPage />
          </Route>
          <Route exact path="/help">
            <HelpPage />
          </Route>
        </Switch>

    </main>

export default Main;