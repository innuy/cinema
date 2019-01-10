import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../OptionButton";

import './styles.css';

class PresentationDetails extends Component {


    state = {
        presentation: {
            tickets: null,
            auditorium: null,
            film: null,
            startTime: null,
        }
    };

    componentWillMount() {
        if(this.props.presentation){
            this.setState({
                presentation: this.props.presentation,
            })
        }
    }

    render() {
        return (
            <div className="presentationDetailsContainer">
                <div className="presentationDetailsPageTitle">PRESENTATION INFORMATION</div>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsTitle">Film:</div>
                <input className="presentationInput" value={this.state.presentation.film} onChange={(event) => {
                    const presentation = this.state.presentation;
                    presentation.film = event.target.value;
                    this.setState({
                        presentation
                    });
                }}/>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsTitle">Auditorium:</div>
                <input className="presentationInput" value={this.state.presentation.auditorium} onChange={(event) => {
                    const presentation = this.state.presentation;
                    presentation.auditorium = event.target.value;
                    this.setState({
                        presentation
                    });
                }}/>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsTitle">Start time:</div>
                <input className="presentationInput" value={this.state.presentation.startTime} onChange={(event) => {
                    const presentation = this.state.presentation;
                    presentation.startTime = event.target.value;
                    this.setState({
                        presentation
                    });
                }}/>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsSeparator"/>
                <OptionButton onClick={() => {
                    //TODO: CHECK ALL DATA IS PRESENT
                    this.props.callback(this.state.presentation);
                }} text={this.props.buttonText}/>
            </div>
        );
    }
}

PresentationDetails.propTypes = {
    presentation: PropTypes.object,
    callback: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default PresentationDetails;