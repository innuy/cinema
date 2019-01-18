import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AuditoriumElement from '../AuditoriumElement';
import OptionButton from "../../GENERAL/OptionButton";


import './styles.css';

class AuditoriumView extends Component {

    renderAuditoriums(){
        const result = [];

        for(let i = 0; i < this.props.auditoriums.length; i++){
            result.push(<AuditoriumElement key={"auditorium_"+i} auditorium={this.props.auditoriums[i]}
                                           deleteAuditorium={this.props.deleteAuditorium} isAdmin={this.props.isAdmin}
                                           navigateToDetails={this.props.navigateToDetails}/>);
        }

        return result
    }


    render() {

        return (
            <div>
                <div className="auditoriumViewTitle">All Auditoriums</div>
                <div className="row auditoriumViewContainer justify-content-center">
                    {this.renderAuditoriums()}
                </div>
                {this.props.isAdmin ? <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.props.addAuditorium} text={"Add Auditorium"}/>
                </div> : null}
            </div>
        );
    }
}

AuditoriumView.propTypes = {
    auditoriums: PropTypes.array.isRequired,
    addAuditorium: PropTypes.func.isRequired,
    deleteAuditorium: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    navigateToDetails: PropTypes.func.isRequired,
};

export default AuditoriumView;