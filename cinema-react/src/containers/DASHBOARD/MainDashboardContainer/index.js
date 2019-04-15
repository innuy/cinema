import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import NavBar from "../../../components/GENERAL/NavBar";
import MainDashboard from "../../../components/DASHBOARD/MainDashboard";


class MainDashboardContainer extends Component {

    state = {};

    history = null;

    componentWillMount() {

    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={true} history={this.history}/>
                    <MainDashboard/>
                </div>);
            }}/>
        );
    }
}

export default MainDashboardContainer;