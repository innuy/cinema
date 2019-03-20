import React, {Component} from 'react';

import './styles.css';
import TopFilmsWidgetContainer from "../../../containers/DASHBOARD/TopFilmsWidgetContainer";
import BusyTimesWidgetContainer from "../../../containers/DASHBOARD/BusyTimesWidgetContainer";
// import {getBusyTimes} from "../../../API/dashboard";
import {setDashboardSocket} from "../../../API/socket";

class MainDashboard extends Component {
    state = {
        topFilms: [],
        ticketsReserved: 0,
        ticketsSold: 0,
        busyTimes: [],
    };

    constructor(props){
        super(props);

        this.getDashboardData = this.getDashboardData.bind(this);
    }

    componentWillMount() {
        this.getDashboardData();
    }

    getDashboardData(){
        setDashboardSocket((success, topFilms, ticketsReserved, ticketsSold, busyTimes) => {
            if(success){
                this.setState({
                    topFilms: topFilms,
                    ticketsReserved: ticketsReserved,
                    ticketsSold: ticketsSold,
                    busyTimes: busyTimes
                });
            }
            else{
                //TODO: HANDLE ERROR
            }
        });
    }

    render() {
        return (
            <div>
                <div className="dashboardViewTitle">Dashboard</div>
                <div className="container">
                    <TopFilmsWidgetContainer topFilms={this.state.topFilms} ticketsReserved={this.state.ticketsReserved} ticketsSold={this.state.ticketsSold}/>
                    <BusyTimesWidgetContainer busyTimes={this.state.busyTimes}/>
                </div>
            </div>

        );
    }
}

MainDashboard.propTypes = {

};

export default MainDashboard;
