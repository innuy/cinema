import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PresentationView from "../../../components/PRESENTATIONS/PresentationView";
import {getPresentations} from "../../../API/presentations";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";


class SeePresentationContainer extends Component {

    state = {
        presentations: [],
        isAdmin: false,
    };

    history = null;

    constructor(props){
        super(props);

        this.refreshPresentations = this.refreshPresentations.bind(this);
        this.reserveTicket = this.reserveTicket.bind(this);
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

    reserveTicket(presentationId){
        navigate(this.history, '/reserveTicket/' + presentationId)
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <PresentationView presentations={this.state.presentations} reserveTicket={this.reserveTicket} isAdmin={this.state.isAdmin}/>
                </div>);
            }} />
        );
    }
}

export default SeePresentationContainer;