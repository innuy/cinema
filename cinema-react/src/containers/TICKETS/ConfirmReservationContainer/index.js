import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {getTickets} from "../../../API/tickets";
import NavBar from "../../../components/GENERAL/NavBar";
import MyTickets from '../../../components/TICKETS/MyTickets';
import ConfirmReservation from "../../../components/TICKETS/ConfirmReservation";


class ConfirmReservationContainer extends Component {

    state = {
        tickets: [],
        isAdmin: true,
    };

    history = null;

    constructor(props){
        super(props);

        this.refreshTickets = this.refreshTickets.bind(this);
    }

    componentWillMount() {
        this.refreshTickets();
    }

    refreshTickets(){
        getTickets((success, data) => {

            if(success) {
                this.setState({
                    tickets: data,
                });
            }
            else{
                /*TODO: HANDLE ERROR*/
            }
        });
    }

    confirmTicket(){

    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <ConfirmReservation confirmTicket={this.confirmTicket} tickets={this.state.tickets}/>
                </div>);
            }} />
        );
    }
}

export default ConfirmReservationContainer;