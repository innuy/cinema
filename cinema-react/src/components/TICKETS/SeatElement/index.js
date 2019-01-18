import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import seat from '../../../images/generic/seat.png';

class SeatElement extends Component {

    render() {

        return (
            <div className='seatElementContainer' onClick={() => {this.props.selectionCallback(this.props.row, this.props.column)}}>
                <img className='seatElementImage' alt={"Seat row:" + this.props.row +", column: " + this.props.column} src={seat}/>
                {this.props.selected ? <div className='seatElementSelectedText'>SELECTED</div> : null}
            </div>
        );
    }
}

SeatElement.propTypes = {
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
    selectionCallback: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
};


export default SeatElement;