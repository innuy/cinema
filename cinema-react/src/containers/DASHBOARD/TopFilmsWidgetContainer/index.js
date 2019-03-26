import React, {Component} from 'react';

import TopMoviesWidget from "../../../components/DASHBOARD/TopMoviesWidget";
import PropTypes from "prop-types";


class TopFilmsWidgetContainer extends Component {

    render() {
        return (
            <TopMoviesWidget topFilms={this.props.topFilms} ticketsReserved={this.props.ticketsReserved}
                             ticketsSold={this.props.ticketsSold}/>
        );
    }
}

TopFilmsWidgetContainer.propTypes = {
    topFilms: PropTypes.array.isRequired,
    ticketsReserved: PropTypes.number.isRequired,
    ticketsSold: PropTypes.number.isRequired,
};

export default TopFilmsWidgetContainer;