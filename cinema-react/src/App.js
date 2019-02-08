import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import FilmContainer from "./containers/FILMS/FilmContainer";
import FilmDetailsContainer from "./containers/FILMS/FilmDetailsContainer";
import AddFilmContainer from "./containers/FILMS/AddFilmContainer";
import AuditoriumContainer from "./containers/AUDITORIUMS/AuditoriumContainer";
import AuditoriumDetailsContainer from "./containers/AUDITORIUMS/AuditoriumDetailsContainer";
import AddAuditoriumContainer from "./containers/AUDITORIUMS/AddAuditoriumContainer";
import AddPresentationContainer from "./containers/PRESENTATIONS/AddPresentationContainer";
import PresentationDetailsContainer from "./containers/PRESENTATIONS/PresentationDetailsContainer";
import PresentationContainer from "./containers/PRESENTATIONS/PresentationContainer";
import SeePresentationContainer from "./containers/PRESENTATIONS/SeePresentationsContainer";
import TicketContainer from "./containers/TICKETS/TicketContainer";
import AddTicketContainer from "./containers/TICKETS/AddTicketContainer";
import TicketDetailsContainer from "./containers/TICKETS/TicketDetailsContainer";

import './App.css';
import MyTicketsContainer from "./containers/TICKETS/MyTicketsContainer";
import ReserveTicketContainer from "./containers/TICKETS/ReserveTicketContainer";
import LoginContainer from "./containers/AUTH/LoginContainer";
import SignUpContainer from "./containers/AUTH/SignupContainer";
import ConfirmReservationContainer from "./containers/TICKETS/ConfirmReservationContainer";

class App extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={LoginContainer}/>
                <Route exact path='/signup' component={SignUpContainer}/>
                {/*ADMIN SCREENS*/}
                <Route exact path='/films' component={FilmContainer}/>
                <Route exact path='/addFilm' component={AddFilmContainer}/>
                <Route exact path='/film/:id' component={FilmDetailsContainer}/>
                <Route exact path='/auditoriums' component={AuditoriumContainer}/>
                <Route exact path='/addAuditorium' component={AddAuditoriumContainer}/>
                <Route exact path='/auditorium/:id' component={AuditoriumDetailsContainer}/>
                <Route exact path='/presentations' component={PresentationContainer}/>
                <Route exact path='/addPresentation' component={AddPresentationContainer}/>
                <Route exact path='/presentation/:id' component={PresentationDetailsContainer}/>
                <Route exact path='/tickets' component={TicketContainer}/>
                <Route exact path='/addTicket' component={AddTicketContainer}/>
                <Route exact path='/tickets/:id' component={TicketDetailsContainer}/>
                <Route exact path='/confirmReservation' component={ConfirmReservationContainer}/>
                {/*USER SCREENS*/}
                <Route exact path='/seePresentations' component={SeePresentationContainer}/>
                <Route exact path='/myTickets' component={MyTicketsContainer}/>
                <Route exact path='/reserveTicket/:id' component={ReserveTicketContainer}/>
            </Switch>
        </div>
    );
  }
}

export default App;