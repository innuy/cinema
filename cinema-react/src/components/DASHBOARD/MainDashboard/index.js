import React, {Component} from 'react';

import './styles.css';
import TopMoviesWidgetContainer from "../../../containers/DASHBOARD/TopMoviesWidgetContainer";
import BusyTimesWidgetContainer from "../../../containers/DASHBOARD/BusyTimesWidgetContainer";

class MainDashboard extends Component {

    render() {
        return (
            <div>
                <div className="dashboardViewTitle">Dashboard</div>
                <div className="row">
                    <TopMoviesWidgetContainer/>
                    <BusyTimesWidgetContainer/>
                </div>
            </div>
        );
    }
}

MainDashboard.propTypes = {

};

export default MainDashboard;