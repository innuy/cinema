import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AuditoriumView from "../../../components/AUDITORIUMS/AuditoriumView";
import {getAuditoriums, deleteAuditorium} from "../../../API/auditoriums";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";


class AuditoriumContainer extends Component {

    state = {
        auditoriums: [{},{},{}],
        isAdmin: true,
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteAuditorium = this.deleteAuditorium.bind(this);
        this.refreshAuditoriums = this.refreshAuditoriums.bind(this);
        this.addAuditorium = this.addAuditorium.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentWillMount() {
        this.refreshAuditoriums();
    }

    refreshAuditoriums(){
        getAuditoriums((success, data) => {

            if(success) {
                this.setState({
                    auditoriums: data,
                });
            }
            else{
                /*TODO: HANDLE ERROR*/
            }
        });
    }

    addAuditorium(){
        navigate(this.history, 'addAuditorium');
    }

    deleteAuditorium(id){
        deleteAuditorium(id, (success) => {
            if(success) {
                this.refreshAuditoriums();
            }
            else{
                /*TODO: HANDLE ERROR FOR DELETION*/
            }
        })
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
                </div>);
            }} />
        );
    }
}

export default AuditoriumContainer;