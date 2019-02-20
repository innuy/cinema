import React, { Component } from 'react';
import PresentationDetails from "../../../components/PRESENTATIONS/PresentationDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {addPresentation} from '../../../API/presentations';
import {Route} from "react-router-dom";
import {getFilms} from "../../../API/films";
import {getAuditoriums} from "../../../API/auditoriums";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class AddPresentationContainer extends Component {

    history = null;

    state = {
        id: 0,
        films: [],
        auditoriums: [],
        errorVisible: false,
    };

    constructor(props){
        super(props);

        this.addPresentation = this.addPresentation.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        }, () => {
            getFilms((success, films) => {
                if(success) {
                    this.setState({
                        films
                    });
                }
                else{
                    this.setState({
                        errorVisible: true,
                    });
                }
            });
            getAuditoriums((success, auditoriums) => {
                if(success) {
                    this.setState({
                        auditoriums
                    });
                }
                else{
                    this.setState({
                        errorVisible: true,
                    });
                }
            });
        });


    }

    addPresentation(newPresentation){
        addPresentation(newPresentation, (success) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                this.setState({
                    errorVisible: true,
                });
            }
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={true} history={this.history}/>
                    <PresentationDetails callback={this.addPresentation} films={this.state.films} auditoriums={this.state.auditoriums}
                                         buttonText={"ADD"} newPresentation={true}/>
                    {this.state.errorVisible ? <ErrorAlert callback={() => {this.setState({errorVisible: false})}} text={'There was an error'}/> : null}
                </div>);}} />
        );
    }
}

export default AddPresentationContainer;