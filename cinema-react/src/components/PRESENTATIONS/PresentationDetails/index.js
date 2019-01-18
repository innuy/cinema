import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';

class PresentationDetails extends Component {


    state = {
        presentation: {
            auditorium: null,
            film: null,
            startTime: null,
        },

        errors: {
            auditorium: false,
            film: false,
            startTime: false,
        }
    };

    constructor(props){
        super(props);

        this.renderFilms = this.renderFilms.bind(this);
        this.renderAuditoriums = this.renderAuditoriums.bind(this);
        this.savePresentationData = this.savePresentationData.bind(this);
        this.presentationHasErrors = this.presentationHasErrors.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.presentation){
            this.setState({
                presentation: newProps.presentation,
            });
        }
    }

    renderFilms(){
        const res = [];

        for(let i = 0; i < this.props.films; i++){
            res.push(<option value={this.props.films[i].id}>{this.props.films[i].name}</option>);
        }

        return res;
    }

    renderAuditoriums() {
        const res = [];

        for(let i = 0; i < this.props.auditoriums; i++){
            res.push(<option value={this.props.auditoriums[i].id}>{this.props.auditoriums[i].number}</option>);
        }

        return res;
    }

    savePresentationData(){

        const errors = {
            auditorium: false,
            film: false,
            startTime: false,
        };

        if(!this.state.presentation.auditorium){
            errors.auditorium = true;
        }
        if(!this.state.presentation.film){
            errors.film = true;
        }
        if(!this.state.presentation.startTime){
            errors.startTime = true;
        }

        this.setState({
            errors,
        }, () => {
            if(!this.presentationHasErrors()) {
                this.props.callback(this.state.presentation);
            }
        });

    }

    presentationHasErrors(){
        return this.state.errors.auditorium && this.state.errors.film && this.state.errors.startTime
    }

    render() {
        return (
            <div>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsContainer">
                    <div className="presentationDetailsPageTitle">PRESENTATION INFORMATION</div>
                    <div className="presentationDetailsSeparator"/>
                    <div className="presentationDetailsTitle">Film:</div>
                    <select className="presentationInput" onChange={(data) => {
                        const presentation = this.state.presentation;
                        presentation.film = data.target.value;
                        this.setState({
                            presentation
                        });}}>
                        {this.renderFilms()}
                    </select>
                    {this.state.errors.film ? <div className="presentationDetailsErrorMessage">There is an error in the film</div> : null}
                    <div className="presentationDetailsSeparator"/>
                    <div className="presentationDetailsTitle">Auditorium:</div>
                    <select className="presentationInput" onChange={(data) => {
                        const presentation = this.state.presentation;
                        presentation.auditorium = data.target.value;
                        this.setState({
                            presentation
                        });
                    }}>
                        {this.renderAuditoriums()}
                    </select>
                    {this.state.errors.auditorium ? <div className="presentationDetailsErrorMessage">There is an error in the auditorium</div> : null}
                    <div className="presentationDetailsSeparator"/>
                    <div className="presentationDetailsTitle">Start time:</div>
                    <input className="presentationInput" type="datetime-local" value={this.state.presentation.startTime} onChange={(event) => {
                        const presentation = this.state.presentation;
                        presentation.startTime = event.target.value;
                        this.setState({
                            presentation
                        });
                    }}/>
                    {this.state.errors.startTime ? <div className="presentationDetailsErrorMessage">There is an error in the start time</div> : null}
                    <div className="presentationDetailsSeparator"/>
                    <div className="presentationDetailsSeparator"/>
                    <div className="presentationDetailsSeparator"/>
                    <div className="presentationDetailsSeparator"/>
                    <OptionButton onClick={this.savePresentationData} text={this.props.buttonText}/>
                </div>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsSeparator"/>
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