import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import seat from '../../../images/generic/seat.png';
import seatTaken from '../../../images/generic/seatTaken.png';
import seatSelected from '../../../images/generic/seatSelected.png';

class SeatElement extends Component {

    render() {

        let image = null;

        if (this.props.selected) {
            image = seatSelected;
        } else if (this.props.taken) {
            image = seatTaken;
        } else {
            image = seat;
        }

        return (
            <div className='seatElementContainer col ' onClick={() => {
                if (!this.props.taken) {
                    this.props.selectionCallback(this.props.row, this.props.column)
                }
            }}>
                <img className='seatElementImage' alt={"Seat row:" + this.props.row + ", column: " + this.props.column}
                     src={image}/>
            </div>
        );
    }
}

SeatElement.propTypes = {
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
    selectionCallback: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    taken: PropTypes.bool.isRequired,
};


export default SeatElement;