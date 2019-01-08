import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AuditoriumView from "../../components/AuditoriumView";
import {getAuditoriums, deleteAuditorium} from "../../API/auditoriums";
import NavBar from "../../components/NavBar";


class AuditoriumContainer extends Component {

    state = {
        auditoriums: [{},{},{}],
        isAdmin: false,
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteAuditorium = this.deleteAuditorium.bind(this);
        this.refreshAuditoriums = this.refreshAuditoriums.bind(this);
    }

    componentWillMount() {
        this.refreshAuditoriums();
    }

    refreshAuditoriums(){
        getAuditoriums((success, data) => {
            /*TODO: HANDLE ERROR*/
            this.setState({
                auditoriums: data,
            });
        });
    }

    deleteAuditorium(id){
        deleteAuditorium(id, () => {
            this.refreshAuditoriums();

            /*TODO: HANDLE ERROR FOR DELETION*/
        })
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={this.state.isAdmin} history={this.history}/>
                    <AuditoriumView auditoriums={this.state.auditoriums} deleteAuditorium={this.deleteAuditorium} isAdmin={this.state.isAdmin}/>
                </div>);
            }} />
        );
    }
}

export default AuditoriumContainer;