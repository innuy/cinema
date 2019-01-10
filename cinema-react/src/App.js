import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import FirstProcess from "./containers/FirstProcess";
import FilmContainer from "./containers/FilmContainer";
import FilmDetailsContainer from "./containers/FilmDetailsContainer";
import AddFilmContainer from "./containers/AddFilmContainer";

import './App.css';
import AuditoriumContainer from "./containers/AuditoriumContainer";
import AuditoriumDetailsContainer from "./containers/AuditoriumDetailsContainer";
import AddAuditoriumContainer from "./containers/AddAuditoriumContainer";
import AddPresentationContainer from "./containers/AddPresentationContainer";
import PresentationDetailsContainer from "./containers/PresentationDetailsContainer";
import PresentationContainer from "./containers/PresentationContainer";

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
                <Route exact path='/addFilm' component={AddFilmContainer}/>
                <Route exact path='/film/:id' component={FilmDetailsContainer}/>
                <Route exact path='/auditoriums' component={AuditoriumContainer}/>
                <Route exact path='/addAuditorium' component={AddAuditoriumContainer}/>
                <Route exact path='/auditorium/id' component={AuditoriumDetailsContainer}/>
                <Route exact path='/presentations' component={PresentationContainer}/>
                <Route exact path='/addPresentation' component={AddPresentationContainer}/>
                <Route exact path='/presentation/id' component={PresentationDetailsContainer}/>
                <Route exact path='/tickets' component={null}/>
                {/*USER SCREENS*/}
                <Route exact path='/reservations' component={null}/>
                <Route exact path='/seePresentations' component={null}/>
            </Switch>
        </div>
    );
  }
}

export default App;
