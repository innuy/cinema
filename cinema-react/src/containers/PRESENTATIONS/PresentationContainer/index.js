import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PresentationView from "../../../components/PRESENTATIONS/PresentationView";
import {getPresentations, deletePresentation} from "../../../API/presentations";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";
import {getAuditoriums} from "../../../API/auditoriums";
import {getFilms} from "../../../API/films";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class PresentationContainer extends Component {

    state = {
        presentations: [],
        isAdmin: true,

        films: [],
        auditoriums: [],

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props){
        super(props);

        this.deletePresentation = this.deletePresentation.bind(this);
        this.refreshPresentations = this.refreshPresentations.bind(this);
        this.addPresentation = this.addPresentation.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {
        this.refreshPresentations();
    }

    refreshPresentations(){
        getPresentations((success, data) => {

            if(success) {
                this.setState({
                    presentations: data,
                });
            }
            else{
                if(!this.state.errorVisible && data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshPresentations,
                    });
                }
            }
        });

        getAuditoriums((success, data) => {
            if(success) {
                this.setState({
                    auditoriums: data,
                });
            }
            else{
                if(!this.state.errorVisible && data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshPresentations,
                    });
                }
            }
        });

        getFilms((success, data) => {
            if(success) {
                this.setState({
                    films: data,
                });
            }
            else{
                if(!this.state.errorVisible && data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshPresentations,
                    });
                }
            }
        });
    }

    addPresentation(){
        navigate(this.history, '/addPresentation')
    }

    deletePresentation(id){
        deletePresentation(id, (success, data) => {
            if(success) {
                this.refreshPresentations();
            }
            else{
                if(!this.state.errorVisible && data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.hideError,
                    });
                }
            }
        })
    }

    hideError(){
        this.setState({errorVisible: false});
    }

    navigateToDetails(id){
        navigate(this.history, '/presentation/'+id)
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <PresentationView navigateToDetails={this.navigateToDetails} presentations={this.state.presentations}
                                      addPresentation={this.addPresentation} deletePresentation={this.deletePresentation}
                                      films={this.state.films} auditoriums={this.state.auditoriums} isAdmin={this.state.isAdmin}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }} />
        );
    }
}

export default PresentationContainer;