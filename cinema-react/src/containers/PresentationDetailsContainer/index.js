import React, { Component } from 'react';
import PresentationDetails from "../../components/PresentationDetails";
import NavBar from "../../components/NavBar";

import {editPresentation} from "../../API/presentations";
import {Route} from "react-router-dom";

class PresentationDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        presentation: {}
    };

    constructor(props){
        super(props);

        this.editPresentation = this.editPresentation.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        /* TODO: GET FILM BY ID */
    }

    editPresentation(newPresentation){
        editPresentation(newPresentation, () => {
            //TODO: NAVIGATE BACK
        })
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <PresentationDetails presentation={this.state.presentation} callback={this.editPresentation} buttonText={"EDIT"}/>
                        </div>);}} />
        );
    }
}

export default PresentationDetailsContainer;