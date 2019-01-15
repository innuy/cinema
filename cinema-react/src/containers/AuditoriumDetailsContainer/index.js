import React, { Component } from 'react';
import AuditoriumDetails from "../../components/AuditoriumDetails";
import NavBar from "../../components/NavBar";

import {editAuditorium} from "../../API/auditoriums";
import {Route} from "react-router-dom";

class AuditoriumDetailsContainer extends Component {

    history = null;

    state = {
        id: 0,
        auditorium: {}
    };

    constructor(props){
        super(props);

        this.editAuditorium = this.editAuditorium.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        /* TODO: GET FILM BY ID */
    }

    editAuditorium(newAuditorium){
        editAuditorium(newAuditorium, () => {
            //TODO: NAVIGATE BACK
        })
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <AuditoriumDetails auditorium={this.state.auditorium} callback={this.editAuditorium} buttonText={"EDIT"}/>
                        </div>);}} />
        );
    }
}

export default AuditoriumDetailsContainer;