import React, { Component } from 'react';
import AuditoriumDetails from "../../components/AuditoriumDetails";
import NavBar from "../../components/NavBar";

import {editAuditorium} from "../../API/auditoriums";

class AuditoriumDetailsContainer extends Component {

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
            <div>
                <NavBar isAdmin={true}/>
                <AuditoriumDetails auditorium={this.state.auditorium} callback={this.editAuditorium} buttonText={"EDIT"}/>
            </div>
        );
    }
}

export default AuditoriumDetailsContainer;