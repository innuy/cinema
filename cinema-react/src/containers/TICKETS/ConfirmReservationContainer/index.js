import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import {getTickets} from "../../../API/tickets";
import NavBar from "../../../components/GENERAL/NavBar";
import ConfirmReservation from "../../../components/TICKETS/ConfirmReservation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class ConfirmReservationContainer extends Component {

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

        this.refreshTickets = this.refreshTickets.bind(this);
    }

    componentWillMount() {
        this.refreshTickets();
    }

    refreshTickets() {
        this.hideError();
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

    confirmTicket() {

    }

    hideError() {
        this.setState({errorVisible: false});
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <ConfirmReservation confirmTicket={this.confirmTicket} tickets={this.state.tickets}/>
                    {this.state.errorVisible ?
                        <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }}/>
        );
    }
}

export default ConfirmReservationContainer;