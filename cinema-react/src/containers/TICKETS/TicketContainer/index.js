import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import TicketView from "../../../components/TICKETS/TicketView";
import {getTickets, deleteTicket} from "../../../API/tickets";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class TicketContainer extends Component {

    state = {
        tickets: [],
        isAdmin: true,

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);
        this.refreshTickets = this.refreshTickets.bind(this);
        this.addTicket = this.addTicket.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentWillMount() {
        this.refreshTickets();
    }

    refreshTickets() {
        getTickets((success, data) => {

            if (success) {
                this.setState({
                    tickets: data,
                });
            } else {
                if (data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshTickets,
                    });
                }
            }
        });
    }

    addTicket() {
        navigate(this.history, '/addTicket');
    }

    deleteTicket(id) {
        deleteTicket(id, (success, msg) => {
            if (success) {
                this.refreshTickets();

            } else {
                if (msg) {
                    this.setState({
                        errorVisible: true,
                        errorText: msg,
                        errorCallback: this.hideError,
                    });
                }
            }

        })
    }

    hideError() {
        this.setState({errorVisible: false});
    }

    navigateToDetails(id) {
        navigate(this.history, 'tickets/' + id);
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <TicketView tickets={this.state.tickets} addTicket={this.addTicket}
                                navigateToDetails={this.navigateToDetails}
                                deleteTicket={this.deleteTicket} isAdmin={this.state.isAdmin}/>
                    {this.state.errorVisible ?
                        <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }}/>
        );
    }
}

export default TicketContainer;