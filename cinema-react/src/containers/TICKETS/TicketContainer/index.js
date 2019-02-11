import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import TicketView from "../../../components/TICKETS/TicketView";
import {getTickets, deleteTicket} from "../../../API/tickets";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";


class TicketContainer extends Component {

    state = {
        tickets: [],
        isAdmin: true,
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);
        this.refreshTickets = this.refreshTickets.bind(this);
        this.addTicket = this.addTicket.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
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

    addTicket(){
        navigate(this.history, '/addTicket');
    }

    deleteTicket(id){
        deleteTicket(id, (success) => {
            if(success) {
                this.refreshTickets();

            }
            else{
                /* TODO: HANDLE ERROR */
            }

        })
    }

    navigateToDetails(id){
        navigate(this.history, 'tickets/'+id);
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                            <TicketView tickets={this.state.tickets} addTicket={this.addTicket} navigateToDetails={this.navigateToDetails}
                                        deleteTicket={this.deleteTicket} isAdmin={this.state.isAdmin}/>
                        </div>);
            }} />
        );
    }
}

export default TicketContainer;