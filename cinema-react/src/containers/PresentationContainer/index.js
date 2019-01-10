import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PresentationView from "../../components/PresentationView";
import {getPresentations, deletePresentation} from "../../API/presentations";
import NavBar from "../../components/NavBar";
import {navigate} from "../../utils/navigation";


class PresentationContainer extends Component {

    state = {
        presentations: [{},{},{}],
        isAdmin: false,
    };

    history = null;

    constructor(props){
        super(props);

        this.deletePresentation = this.deletePresentation.bind(this);
        this.refreshPresentations = this.refreshPresentations.bind(this);
        this.addPresentation = this.addPresentation.bind(this);
    }

    componentWillMount() {
        this.refreshPresentations();
    }

    refreshPresentations(){
        getPresentations((success, data) => {
            /*TODO: HANDLE ERROR*/
            this.setState({
                presentations: data,
            });
        });
    }

    addPresentation(){
        navigate(this.history, '/addPresentation')
    }

    deletePresentation(id){
        deletePresentation(id, () => {
            this.refreshPresentations();

            /* TODO: HANDLE ERROR */
        })
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <PresentationView presentations={this.state.presentations} addPresentation={this.addPresentation} deletePresentation={this.deletePresentation} isAdmin={this.state.isAdmin}/>
                </div>);
            }} />
        );
    }
}

export default PresentationContainer;