import React, { Component } from 'react';
import PresentationDetails from "../../../components/PRESENTATIONS/PresentationDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {editPresentation, getSinglePresentation} from "../../../API/presentations";
import {Route} from "react-router-dom";
import {getFilms} from "../../../API/films";
import {getAuditoriums} from "../../../API/auditoriums";
import {navigateBack} from "../../../utils/navigation";

class PresentationDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        presentation: {},
        films: [],
        auditoriums: [],
    };

    constructor(props){
        super(props);

        this.editPresentation = this.editPresentation.bind(this);
    }

    componentWillMount() {
        this.setState({
            id: this.props.match.params.id,
        }, () => {
            getSinglePresentation(this.state.id, (success, presentation) => {
                if(success) {
                    this.setState({
                        presentation
                    });
                }
                else{
                    /* TODO HANDLE ERROR */
                }
            });
            getFilms((success, films) => {
                if(success) {
                    this.setState({
                        films
                    });
                }
                else{
                    //TODO: HANDLE ERROR
                }
            });
            getAuditoriums((success, auditoriums) => {
                if(success) {
                    this.setState({
                        auditoriums
                    });
                }
                else{
                    //TODO: HANDLE ERROR
                }
            });
        });
    }

    editPresentation(newPresentation){
        editPresentation(newPresentation, (success) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                //TODO: HANDLE ERROR
            }
        })
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <PresentationDetails presentation={this.state.presentation} films={this.state.films}
                                                 auditoriums={this.state.auditoriums} callback={this.editPresentation} buttonText={"EDIT"}/>
                        </div>);}} />
        );
    }
}

export default PresentationDetailsContainer;