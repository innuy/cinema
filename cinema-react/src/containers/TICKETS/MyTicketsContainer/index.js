import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {getMyTickets} from "../../../API/tickets";
import NavBar from "../../../components/GENERAL/NavBar";
import MyTickets from '../../../components/TICKETS/MyTickets';


class MyTicketsContainer extends Component {

    state = {
        tickets: [],
        isAdmin: false,
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
        getMyTickets((success, data) => {

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


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <MyTickets tickets={this.state.tickets}/>
                </div>);
            }} />
        );
    }
}

export default MyTicketsContainer;