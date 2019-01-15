import React, { Component } from 'react';
import AuditoriumDetails from "../../components/AuditoriumDetails";
import NavBar from "../../components/NavBar";

import {addAuditorium} from '../../API/auditoriums';
import {Route} from "react-router-dom";

class AddAuditoriumContainer extends Component {

    history = null;

    state = {
        id: 0,
    };

    constructor(props){
        super(props);

        this.addAuditorium = this.addAuditorium.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        /* TODO: GET AUDITORIUM BY ID */
    }

    addAuditorium(newAuditorium){
        addAuditorium(newAuditorium, () => {
            //TODO: NAVIGATE BACK
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <AuditoriumDetails callback={this.addAuditorium} buttonText={"ADD"}/>
                        </div>);}} />
        );
    }
}

export default AddAuditoriumContainer;