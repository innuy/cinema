import React, { Component } from 'react';

import TopMoviesWidget from "../../../components/DASHBOARD/TopMoviesWidget";


class TopMoviesWidgetContainer extends Component {

    state = {
        topMovies: [],
        ticketsReserved: 0,
        ticketsSold: 0
    };

    constructor(props){
        super(props);

        this.getMoviesData = this.getMoviesData.bind(this);
    }

    componentWillMount() {
        this.getMoviesData();
    }

    getMoviesData(){
        /* TODO: GET DATA FOR MOVIES */
    }


    render() {
        return (
            <TopMoviesWidget topMovies={this.state.topMovies} ticketsReserved={this.state.ticketsReserved} ticketsSold={this.state.ticketsSold}/>
        );
    }
}

export default TopMoviesWidgetContainer;