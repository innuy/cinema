import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PresentationElement from '../PresentationElement';
import OptionButton from "../../GENERAL/OptionButton";


import './styles.css';

class PresentationView extends Component {

    renderPresentations(){
        const elementList = [];

        for(let i = 0; i < this.props.presentations.length; i++){
            elementList.push(<PresentationElement key={"presentation_"+i} films={this.props.films} auditoriums={this.props.auditoriums}
                                                  navigateToDetails={this.props.navigateToDetails} presentation={this.props.presentations[i]}
                                                  reserveTicket={this.props.reserveTicket} deletePresentation={this.props.deletePresentation} isAdmin={this.props.isAdmin}/>);
        }

        return elementList;
    }


    render() {

        return (
            <div>
                <div className="presentationViewTitle">All Presentations</div>
                <div className="row presentationViewContainer justify-content-center">
                    {this.renderPresentations()}
                </div>
                {this.props.isAdmin ? <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.props.addPresentation} text={"Add Presentation"}/>
                </div> : null}
            </div>
        );
    }
}

PresentationView.propTypes = {
    presentations: PropTypes.array.isRequired,
    addPresentation: PropTypes.func,
    reserveTicket: PropTypes.func,
    deletePresentation: PropTypes.func,
    isAdmin: PropTypes.bool.isRequired,
    navigateToDetails: PropTypes.func,
    auditoriums: PropTypes.array.isRequired,
    films: PropTypes.array.isRequired,
};

export default PresentationView;