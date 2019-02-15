import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AuditoriumView from "../../../components/AUDITORIUMS/AuditoriumView";
import {getAuditoriums, deleteAuditorium} from "../../../API/auditoriums";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class AuditoriumContainer extends Component {

    state = {
        auditoriums: [],
        isAdmin: true,

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteAuditorium = this.deleteAuditorium.bind(this);
        this.refreshAuditoriums = this.refreshAuditoriums.bind(this);
        this.addAuditorium = this.addAuditorium.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    componentWillMount() {
        this.refreshAuditoriums();
    }

    refreshAuditoriums(){
        this.hideError();
        getAuditoriums((success, data) => {

            if(success) {
                this.setState({
                    auditoriums: data,
                });
            }
            else{
                if(data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshAuditoriums,
                    });
                }
            }
        });
    }

    addAuditorium(){
        navigate(this.history, 'addAuditorium');
    }

    deleteAuditorium(id){
        deleteAuditorium(id, (success, msg) => {
            if(success) {
                this.refreshAuditoriums();
            }
            else{
                if(msg) {
                    this.setState({
                        errorVisible: true,
                        errorText: msg,
                        errorCallback: this.hideError,
                    });
                }
            }
        })
    }

    hideError(){
        this.setState({errorVisible: false});
    }

    navigateToDetails(id){
        navigate(this.history, 'auditorium/'+id);
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <AuditoriumView auditoriums={this.state.auditoriums} addAuditorium={this.addAuditorium} deleteAuditorium={this.deleteAuditorium}
                                    isAdmin={this.state.isAdmin} navigateToDetails={this.navigateToDetails}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }} />
        );
    }
}

export default AuditoriumContainer;