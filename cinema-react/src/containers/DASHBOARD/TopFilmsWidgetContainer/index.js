import React, { Component } from 'react';

import TopMoviesWidget from "../../../components/DASHBOARD/TopMoviesWidget";
import {getTopFilms} from "../../../API/dashboard";


class TopFilmsWidgetContainer extends Component {

    state = {
        topFilms: [],
        ticketsReserved: 50,
        ticketsSold: 20
    };

    constructor(props){
        super(props);

        this.getFilmsData = this.getFilmsData.bind(this);
    }

    componentWillMount() {
        this.getFilmsData();
    }

    getFilmsData(){
        getTopFilms((success, data) => {
            if(success){
                //TODO: HANDLE SUCCESS
            }
            else{
                //TODO: HANDLE ERROR (SHOULD TELL PARENT CONTROLLER)
            }
        });
    }


    render() {
        return (
            <TopMoviesWidget topFilms={this.state.topFilms} ticketsReserved={this.state.ticketsReserved} ticketsSold={this.state.ticketsSold}/>
        );
    }
}

export default TopFilmsWidgetContainer;