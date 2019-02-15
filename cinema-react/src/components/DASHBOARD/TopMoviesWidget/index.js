import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

import './styles.css';

class TopMoviesWidget extends Component {

    constructor(props){
        super(props);

        this.renderData = this.renderData.bind(this);
    }

    renderData(){
        const res = [];

        for(let i = 0; i < this.props.topMovies.length; i++){

                res.push(<tr>
                    <td className="reservationTableField">{this.props.topMovies[i].name}</td>
                    <td className="reservationTableField">{this.props.topMovies[i].ticketsReserverd}</td>
                    <td className="reservationTableField">{this.props.topMovies[i].ticketsSold}</td>
                </tr>)
        }

        return res;
    }

    render() {

        return (
            <div className="offset-1 col-4">
                <div className="topMoviesViewTitle">Top movies</div>
                <div>
                    {this.renderData()}
                </div>

                <PieChart
                    data={[
                        { title: 'Sold', value: this.props.ticketsReserved, color: '#E38627' },
                        { title: 'Total Reserved', value: this.props.ticketsSold, color: '#C13C37' },
                    ]}
                />
            </div>
        );
    }
}

TopMoviesWidget.propTypes = {
    topMovies: PropTypes.array.isRequired,
    ticketsReserved: PropTypes.number.isRequired,
    ticketsSold: PropTypes.number.isRequired,
};

export default TopMoviesWidget;