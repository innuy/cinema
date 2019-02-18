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

        for(let i = 0; i < this.props.topFilms.length; i++){

                res.push(<tr key={"row-"+i}>
                    <td key={"name-"+i} className="reservationTableField">{this.props.topFilms[i].name}</td>
                    <td key={"reserved_"+i} className="reservationTableField">{this.props.topFilms[i].ticketsReserverd}</td>
                    <td key={"sold-"+i} className="reservationTableField">{this.props.topFilms[i].ticketsSold}</td>
                </tr>)
        }

        return res;
    }

    render() {

        return (
            <div className="offset-1 col-4">
                <div className="topMoviesViewTitle">Top Films</div>

                <div className="topMoviesContainer">
                    {this.renderData()}
                </div>

                { this.props.ticketsReserved > 0 && this.props.ticketsSold > 0 ?
                    <PieChart
                        data={[
                            {title: 'Sold', value: this.props.ticketsReserved, color: '#E38627'},
                            {title: 'Total Reserved', value: this.props.ticketsSold, color: '#C13C37'},
                        ]}
                    /> : null
                }
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