import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';
import {getAuditoriums} from "../../../API/auditoriums";
import {parseTime} from "../../../utils/time";

class PresentationDetails extends Component {


    state = {
        presentation: {
            auditorium: null,
            film: null,
            startTime: "",
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
            const standardPresentation = newProps.presentation;
            standardPresentation.startTime = this.parseDateValue(standardPresentation.startTime);
            this.setState({
                presentation: standardPresentation,
            });

        }
    }

    renderFilms(){
        const res = [];

        for(let i = 0; i < this.props.films.length; i++){
            res.push(<option key={"film_"+i} value={this.props.films[i].id}>{this.props.films[i].name}</option>);
        }

        return res;
    }

    renderAuditoriums() {
        const res = [];

        for(let i = 0; i < this.props.auditoriums.length; i++){
            res.push(<option key={"auditorium_"+i} value={this.props.auditoriums[i].id} >{this.props.auditoriums[i].number}</option>);
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

    parseDateValue(startTime){
        const date = new Date(startTime);

        let month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1);
        let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        let hours = date.getUTCHours() > 9 ? date.getUTCHours() : "0" + date.getUTCHours();
        let minutes = date.getUTCMinutes() > 9 ? date.getUTCMinutes() : "0" + date.getUTCMinutes();

        return date.getFullYear() + "-" + month + "-" + day + "T" + hours + ":" + minutes;
    }

    render() {

        console.log(this.state.presentation.startTime);

        return (
            <div>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsSeparator"/>
                <div className="presentationDetailsContainer">
                    <div className="presentationDetailsPageTitle">PRESENTATION INFORMATION</div>
                    <div className="presentationDetailsSeparator"/>
                    <div className="presentationDetailsTitle">Film:</div>
                    <select className="presentationInput" defaultValue={this.state.presentation.film} onChange={(data) => {
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
                    <select className="presentationInput" defaultValue={this.state.presentation.auditorium} onChange={(data) => {
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