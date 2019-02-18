import React, {Component} from 'react';

import './styles.css';
import TopFilmsWidgetContainer from "../../../containers/DASHBOARD/TopFilmsWidgetContainer";
import BusyTimesWidgetContainer from "../../../containers/DASHBOARD/BusyTimesWidgetContainer";

class MainDashboard extends Component {

    render() {
        return (
            <div>
                <div className="dashboardViewTitle">Dashboard</div>
                <div className="row">
                    <TopFilmsWidgetContainer/>
                    <BusyTimesWidgetContainer/>
                </div>
            </div>
        );
    }
}

MainDashboard.propTypes = {

};

export default MainDashboard;