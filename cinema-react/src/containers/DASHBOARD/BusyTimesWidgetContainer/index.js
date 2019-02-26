import React, { Component } from 'react';

import BusyTimesWidget from "../../../components/DASHBOARD/BusyTimesWidget";
import {getBusyTimes} from "../../../API/dashboard";

class BusyTimesWidgetContainer extends Component {

    state = {
        busyTimes: [],
    };

    constructor(props){
        super(props);

        this.getBusyTimesData = this.getBusyTimesData.bind(this);
    }

    componentWillMount() {
        this.getBusyTimesData();
    }

    getBusyTimesData(){
        getBusyTimes((success, data) => {
            if(success){
                this.setState({
                    busyTimes: data,
                })
            }
            else{
                //TODO: HANDLE ERROR
            }
        })
    }


    render() {
        return <BusyTimesWidget busyTimes={this.state.busyTimes} />;
    }
}

export default BusyTimesWidgetContainer;