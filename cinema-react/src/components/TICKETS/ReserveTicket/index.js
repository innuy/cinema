import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import SeatElement from "../SeatElement";

class ReserveTicket extends Component {


    state = {
        row: null,
        column: null,
    };

    constructor(props) {
        super(props);

        this.renderSeats = this.renderSeats.bind(this);
        this.selectionCallback = this.selectionCallback.bind(this);
    }


    renderSeats(){
        const res = [];

        let selected = false;

        for(let i = 0; i < this.props.presentation.rows; i++){
            let row = [];
            for(let j = 0; j < this.props.presentation.columns; j++){
                selected = false;
                if(this.state.row === i && this.state.column === j){
                    selected = true;
                }
                row.push(<SeatElement key={'seat_'+i+'_'+j} row={i} column={j} selectionCallback={this.selectionCallback} selected={selected}/>)
            }
            res.push(<div className="row" key={'seat_row_'+i}>{row}</div>);
        }

        return res;
    }

    selectionCallback(row, column){
        this.setState({
            row,
            column
        });
    }

    render() {
        return (
            <div>
                {this.renderSeats()}
                <button onClick={() => {this.props.finalSelection(this.state.row, this.state.column)}}>Confirm</button>
            </div>
        );
    }
}

ReserveTicket.propTypes = {
    presentation: PropTypes.object.isRequired,
    finalSelection: PropTypes.func.isRequired,
};

export default ReserveTicket;