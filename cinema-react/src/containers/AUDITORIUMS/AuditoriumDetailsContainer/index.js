import React, { Component } from 'react';
import AuditoriumDetails from "../../../components/AUDITORIUMS/AuditoriumDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {editAuditorium, getSingleAuditorium} from "../../../API/auditoriums";
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class AuditoriumDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        auditorium: {},

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    constructor(props){
        super(props);

        this.editAuditorium = this.editAuditorium.bind(this);
        this.hideError = this.hideError.bind(this);
        this.obtainAuditoriumData = this.obtainAuditoriumData.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        }, () => {

        });
    }

    obtainAuditoriumData(){
        getSingleAuditorium(this.state.id, (success, auditorium) => {
            if(success) {
                this.setState({
                    auditorium
                });
            }
            else{
                this.setState({
                    errorVisible: true,
                    errorText: "There was an error obtaining auditorium details",
                    errorCallback: this.obtainAuditoriumData,
                });
            }
        });
    }

    editAuditorium(newAuditorium){
        editAuditorium(newAuditorium, (success) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                this.setState({
                    errorVisible: true,
                    errorText: "There was an error saving the auditorium",
                    errorCallback: this.hideError,
                });
            }
        })
    }

    hideError(){
        this.setState({errorVisible: false});
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <AuditoriumDetails auditorium={this.state.auditorium} isEdit={true} callback={this.editAuditorium} buttonText={"EDIT"}/>
                            {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                        </div>);}} />
        );
    }
}

export default AuditoriumDetailsContainer;