import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import FirstProcess from "./containers/FirstProcess";
import FilmContainer from "./containers/FilmContainer";
import FilmDetailsContainer from "./containers/FilmDetailsContainer";

import './App.css';

class App extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={FirstProcess}/>
                <Route exact path='/login' component={null}/>
                <Route exact path='/signup' component={null}/>
                {/*ADMIN SCREENS*/}
                <Route exact path='/films' component={FilmContainer}/>
                <Route exact path='/film/:id' component={FilmDetailsContainer}/>
                <Route exact path='/auditoriums' component={null}/>
                <Route exact path='/presentations' component={null}/>
                <Route exact path='/tickets' component={null}/>
                {/*USER SCREENS*/}
                <Route exact path='/reservations' component={null}/>

            </Switch>
        </div>
    );
  }
}

export default App;
