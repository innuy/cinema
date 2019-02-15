import React, { Component } from 'react';

import BusyTimesWidget from "../../../components/DASHBOARD/BusyTimesWidget";

class BusyTimesWidgetContainer extends Component {

    state = {
        busyTimes: [{x:1, y:2}, {x:2, y:4}],
    };

    constructor(props){
        super(props);

        this.getBusyTimesData = this.getBusyTimesData.bind(this);
    }

    componentWillMount() {
        this.getBusyTimesData();
    }

    getBusyTimesData(){
        /* TODO: GET DATA FOR MOVIES */
    }


    render() {
        return <BusyTimesWidget busyTimes={this.state.busyTimes} />;
    }
}

export default BusyTimesWidgetContainer;