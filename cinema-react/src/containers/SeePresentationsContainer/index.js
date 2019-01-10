import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PresentationView from "../../components/PresentationView";
import {getPresentations} from "../../API/presentations";
import {reserveTicket} from '../../API/tickets';
import NavBar from "../../components/NavBar";


class PresentationContainer extends Component {

    state = {
        presentations: [{},{},{}],
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
            /*TODO: HANDLE ERROR*/
            this.setState({
                presentations: data,
            });
        });
    }

    reserveTicket(presentationId){
        reserveTicket(presentationId, () => {
            //TODO: HANDLE CALLBACK
        })
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

export default PresentationContainer;