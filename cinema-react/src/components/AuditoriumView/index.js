import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AuditoriumElement from '../AuditoriumElement';
import OptionButton from "../OptionButton";


import './styles.css';

class AuditoriumView extends Component {

    constructor(props) {
        super(props);

        this.handleAddAuditorium = this.handleAddAuditorium.bind(this);
    }

    renderAuditoriums(){
        const result = [];

        for(let i = 0; i < this.props.auditoriums.length; i++){
            result.push(<AuditoriumElement key={"movie_"+i} auditorium={this.props.auditoriums[i]} deleteAuditorium={this.props.deleteAuditorium} isAdmin={this.props.isAdmin}/>);
        }

        return result
    }

    handleAddAuditorium(){
        //TODO: SHOW DATA MODAL
    }

    render() {

        return (
            <div>
                <div className="auditoriumViewTitle">All Auditoriums</div>
                <div className="row auditoriumViewContainer justify-content-center">
                    {this.renderAuditoriums()}
                </div>
                {this.props.isAdmin ? <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.handleAddAuditorium} text={"Add Auditorium"}/>
                </div> : null}
            </div>
        );
    }
}

AuditoriumView.propTypes = {
    auditoriums: PropTypes.array.isRequired,
    deleteAuditorium: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default AuditoriumView;