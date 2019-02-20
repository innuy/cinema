import React, { Component } from 'react';
import PresentationDetails from "../../../components/PRESENTATIONS/PresentationDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {editPresentation, getSinglePresentation} from "../../../API/presentations";
import {Route} from "react-router-dom";
import {getFilms} from "../../../API/films";
import {getAuditoriums} from "../../../API/auditoriums";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class PresentationDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        presentation: {},
        films: [],
        auditoriums: [],

        errorVisible: false,
        errorCallback: null,
        errorText: "",
    };

    constructor(props){
        super(props);

        this.editPresentation = this.editPresentation.bind(this);
        this.getAllInfo = this.getAllInfo.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {
        this.setState({
            id: this.props.match.params.id,
        }, () => {
            this.getAllInfo();
        });
    }

    getAllInfo(){
        this.hideError();
        getSinglePresentation(this.state.id, (success, presentation) => {
            if(success) {
                console.log("presentation: " + JSON.stringify(presentation));
                this.setState({
                    presentation
                });
            }
            else{
                if(!this.state.errorVisible) {
                    this.setState({
                        errorVisible: true,
                        errorText: "There was an error obtaining presentation details",
                        errorCallback: this.getAllInfo,
                    });
                }
            }
        });
        getFilms((success, films) => {
            if(success) {
                this.setState({
                    films
                });
            }
            else{
                if(!this.state.errorVisible) {
                    this.setState({
                        errorVisible: true,
                        errorText: "There was an error obtaining films details",
                        errorCallback: this.getAllInfo,
                    });
                }
            }
        });
        getAuditoriums((success, auditoriums) => {
            if(success) {
                this.setState({
                    auditoriums
                });
            }
            else{
                if(!this.state.errorVisible) {
                    this.setState({
                        errorVisible: true,
                        errorText: "There was an error obtaining auditoriums details",
                        errorCallback: this.getAllInfo,
                    });
                }
            }
        });
    }


    editPresentation(newPresentation){
        editPresentation(newPresentation, (success, data) => {
            if(success){
                navigateBack(this.history);
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


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <PresentationDetails presentation={this.state.presentation} films={this.state.films}
                                                 auditoriums={this.state.auditoriums} callback={this.editPresentation} buttonText={"EDIT"}/>
                            {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                        </div>);}} />
        );
    }
}

export default PresentationDetailsContainer;