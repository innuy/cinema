import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import PieChart from 'react-minimal-pie-chart';

import './styles.css';

import AmCharts from "@amcharts/amcharts3-react";

class TopMoviesWidget extends Component {

    render() {

        let soldReservedRatioOptions = {
            "type": "pie",
            "theme": "light",
            "labelRadius": -25,
            "labelText": "[[percents]]%",
            "legend": {
                "position": "bottom",
                "autoMargins": true,
                "autoWrap": true,
            },
            "dataProvider": [
                {title: 'Reserved', value: this.props.ticketsReserved},
                {title: 'Sold', value: this.props.ticketsSold},
            ],
            "valueField": "value",
            "titleField": "title",
            "outlineAlpha": 0.4,
            // "depth3D": 15,
            "balloonText": "<span style='font-size:18px;'>[[value]] [[title]]</span>",
            // "angle": 30,
        };

        console.log(this.props.topFilms);

        let topMoviesOptions = {
            "theme": "light",
            "type": "serial",
            "dataProvider": this.props.topFilms,
            "valueAxes": [{
                "stackType": "3d",
                "position": "left",
                "title": "Tickets",
            }],
            "startDuration": 1,
            "graphs": [{
                "fontSize": 60,
                "balloonText": "Reserved: <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0,
                "title": "Reserved",
                "type": "column",
                "valueField": "ticketsReserved"
            }, {
                "balloonText": "Sold: <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0,
                "title": "Sold",
                "type": "column",
                "valueField": "ticketsSold"
            }],
            "plotAreaFillAlphas": 0.1,
            // "depth3D": 60,
            // "angle": 30,
            "categoryField": "name",
            "categoryAxis": {
                "fontSize": 10,
                "autoWrap": true,
                "gridPosition": "start"
            },
        };

        return (
            <div className="row">
                {this.props.ticketsReserved > 0 && this.props.ticketsSold > 0 ?
                    <div className="col-xs-12 col-sm-12 col-md-4 ">
                        <div className="busyTimesViewTitle">Sold - Reserved</div>

                        <AmCharts.React
                            className="soldReservedPieChart"
                            style={{
                                width: "100%",
                                height: "25vmax",
                            }}
                            options={soldReservedRatioOptions}
                        />
                    </div> : null
                }

                <div className="col-xs-12 col-sm-12 col-md-8 ">
                    <div className="topMoviesViewTitle">Top Films</div>

                    <AmCharts.React
                        className="topMoviesChart"
                        style={{
                            width: "100%",
                            height: "25vmax",
                        }}
                        options={topMoviesOptions}
                    />
                </div>
            </div>
        );
    }
}

TopMoviesWidget.propTypes = {
    topFilms: PropTypes.array.isRequired,
    ticketsReserved: PropTypes.number.isRequired,
    ticketsSold: PropTypes.number.isRequired,
};

export default TopMoviesWidget;