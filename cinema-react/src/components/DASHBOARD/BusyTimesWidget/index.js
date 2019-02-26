import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LineChart from 'react-linechart';

import './styles.css';

class BusyTimesWidget extends Component {


    parseBusyData(data){

        const res = [];

        for(let i = 0; i < data.length; i++){
            res.push({
                x: data[i].hour,
                y: data[i].tickets,
            });
        }

        return res;
    }

    render() {

        const data = [{color: "steelblue",
            points: this.parseBusyData(this.props.busyTimes) }];


        return (
            <div className="busyTimesWidgetContainer offset-2 col-4">
                <div className="busyTimesViewTitle">Busy Times</div>

                {this.props.busyTimes ? <LineChart
                    data={data}
                    width={400}
                    height={400}
                    hideXLabel={true}
                    hideYLabel={true}
                    interpolate={"linear"}
                /> : null}
            </div>
        );
    }
}

BusyTimesWidget.propTypes = {
    busyTimes: PropTypes.array.isRequired,
};

export default BusyTimesWidget;