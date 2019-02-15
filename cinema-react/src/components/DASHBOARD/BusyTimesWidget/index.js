import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LineChart from 'react-linechart';

import './styles.css';

class BusyTimesWidget extends Component {


    render() {


        const data = [{color: "steelblue",
            points: this.props.busyTimes }];

        return (
            <div className="busyTimesWidgetContainer offset-2 col-4">
                <div className="busyTimesViewTitle">Busy Times</div>

                {this.props.busyTimes ? <LineChart
                    data={data}
                    width={400}
                    height={300}
                /> : null}
            </div>
        );
    }
}

BusyTimesWidget.propTypes = {
    busyTimes: PropTypes.array.isRequired,
};

export default BusyTimesWidget;