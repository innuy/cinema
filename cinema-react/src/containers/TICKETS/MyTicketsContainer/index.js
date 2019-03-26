import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import {getMyTickets} from "../../../API/tickets";
import NavBar from "../../../components/GENERAL/NavBar";
import MyTickets from '../../../components/TICKETS/MyTickets';
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class MyTicketsContainer extends Component {

    state = {
        tickets: [],
        isAdmin: false,

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props) {
        super(props);

        this.refreshTickets = this.refreshTickets.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {
        this.refreshTickets();
    }

    refreshTickets() {
        getMyTickets((success, data) => {

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

    hideError() {
        this.setState({errorVisible: false});
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <MyTickets tickets={this.state.tickets}/>
                    {this.state.errorVisible ?
                        <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }}/>
        );
    }
}

export default MyTicketsContainer;