import React, {Component} from 'react';

import BusyTimesWidget from "../../../components/DASHBOARD/BusyTimesWidget";
import PropTypes from "prop-types";

class BusyTimesWidgetContainer extends Component {
    render() {
        return <BusyTimesWidget busyTimes={this.props.busyTimes}/>;
    }
}

BusyTimesWidget.propTypes = {
    busyTimes: PropTypes.array.isRequired,
};

export default BusyTimesWidgetContainer;