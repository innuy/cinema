import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import AmCharts from "@amcharts/amcharts3-react";


class BusyTimesWidget extends Component {


    render() {

        let config = {
            "theme": "light",
            "type": "serial",
            "dataProvider": this.props.busyTimes,
            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 0.1
            }],
            "graphs": [{
                "useNegativeColorIfDown": true,
                "balloonText": "[[category]]h<br>reserved: [[value]]",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletBorderColor": "#FFFFFF",
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": "#67b7dc",
                "valueField": "tickets",
                "fillAlphas": 0.2,
            }],
            "chartScrollbar": {
                "scrollbarHeight": 5,
                "backgroundAlpha": 0.1,
                "backgroundColor": "#868686",
                "selectedBackgroundColor": "#67b7dc",
                "selectedBackgroundAlpha": 1
            },
            "chartCursor": {
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true
            },
            "categoryField": "hour",
            "categoryAxis": {
                "axisAlpha": 0,
                "minHorizontalGap": 60,
                "autoWrap": true,
            },
            "export": {
                "enabled": true
            }
        };

        return (
            <div className="container">
                <div className="busyTimesViewTitle">Busy Times</div>
                <AmCharts.React
                    className="myClass"
                    style={{
                        width: "100%",
                        height: "35vh"
                    }}
                    options={config}/>
            </div>
        );
    }
}

BusyTimesWidget.propTypes = {
    busyTimes: PropTypes.array.isRequired,
};

export default BusyTimesWidget;