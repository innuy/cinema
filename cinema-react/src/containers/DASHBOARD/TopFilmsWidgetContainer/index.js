import React, { Component } from 'react';

import TopMoviesWidget from "../../../components/DASHBOARD/TopMoviesWidget";
import {getSoldRatio, getTopFilms} from "../../../API/dashboard";


class TopFilmsWidgetContainer extends Component {

    state = {
        topFilms: [],
        ticketsReserved: 0,
        ticketsSold: 0,
    };

    constructor(props){
        super(props);

        this.getFilmsData = this.getFilmsData.bind(this);
        this.getSoldRatioData = this.getSoldRatioData.bind(this);
    }

    componentWillMount() {
        this.getFilmsData();
        this.getSoldRatioData();
    }

    getFilmsData(){
        getTopFilms((success, data) => {
            if(success){
                this.setState({
                    topFilms: data
                });
            }
            else{
                //TODO: HANDLE ERROR (SHOULD TELL PARENT CONTROLLER)
            }
        });
    }

    getSoldRatioData(){
        getSoldRatio((success, data) => {
            if(success){
                this.setState({
                   ticketsReserved: data.reserved - data.sold,
                   ticketsSold: data.sold,
                });
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