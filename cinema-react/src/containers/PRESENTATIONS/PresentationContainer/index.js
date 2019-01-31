import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PresentationView from "../../../components/PRESENTATIONS/PresentationView";
import {getPresentations, deletePresentation} from "../../../API/presentations";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";


class PresentationContainer extends Component {

    state = {
        presentations: [],
        isAdmin: true,
    };

    history = null;

    constructor(props){
        super(props);

        this.deletePresentation = this.deletePresentation.bind(this);
        this.refreshPresentations = this.refreshPresentations.bind(this);
        this.addPresentation = this.addPresentation.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
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
                /*TODO: HANDLE ERROR*/
            }
        });
    }

    addPresentation(){
        navigate(this.history, '/addPresentation')
    }

    deletePresentation(id){
        deletePresentation(id, (success) => {
            if(success) {
                this.refreshPresentations();
            }
            else{
                /* TODO: HANDLE ERROR */
            }
        })
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
                    <PresentationView navigateToDetails={this.navigateToDetails} presentations={this.state.presentations} addPresentation={this.addPresentation} deletePresentation={this.deletePresentation} isAdmin={this.state.isAdmin}/>
                </div>);
            }} />
        );
    }
}

export default PresentationContainer;