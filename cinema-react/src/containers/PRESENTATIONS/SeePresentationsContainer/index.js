import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PresentationView from "../../../components/PRESENTATIONS/PresentationView";
import {getPresentations} from "../../../API/presentations";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";
import {getAuditoriums} from "../../../API/auditoriums";
import {getFilms} from "../../../API/films";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class SeePresentationContainer extends Component {

    state = {
        presentations: [],
        isAdmin: false,
        auditoriums: [],
        films: [],

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props){
        super(props);

        this.refreshPresentations = this.refreshPresentations.bind(this);
        this.refreshAuditoriums = this.refreshAuditoriums.bind(this);
        this.refreshFilms = this.refreshFilms.bind(this);

        this.reserveTicket = this.reserveTicket.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {
        this.refreshPresentations();
        this.refreshAuditoriums();
        this.refreshFilms();
    }

    refreshPresentations(){
        getPresentations((success, data) => {
            if(success) {
                this.setState({
                    presentations: data,
                });
            }
            else{
                if(data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshPresentations,
                    });
                }
            }
        });
    }

    refreshAuditoriums(){
        getAuditoriums((success, data) => {
            if(success) {
                this.setState({
                    auditoriums: data,
                });
            }
            else{
                if(data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshAuditoriums,
                    });
                }
            }
        });
    }

    refreshFilms(){
        getFilms((success, data) => {
            if(success) {
                this.setState({
                    films: data,
                });
            }
            else{
                if(data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshFilms,
                    });
                }
            }
        });
    }

    reserveTicket(presentationId){
        navigate(this.history, '/reserveTicket/' + presentationId)
    }

    hideError(){
        this.setState({errorVisible: false});
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <PresentationView presentations={this.state.presentations} films={this.state.films} auditoriums={this.state.auditoriums}
                                      reserveTicket={this.reserveTicket} isAdmin={this.state.isAdmin}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }} />
        );
    }
}

export default SeePresentationContainer;