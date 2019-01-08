import React, { Component } from 'react';
import AuditoriumDetails from "../../components/AuditoriumDetails";
import NavBar from "../../components/NavBar";

import {addAuditorium} from '../../API/auditoriums';

class AddAuditoriumContainer extends Component {

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
            <div>
                {/*TODO: ADD HISTORY*/}
                <NavBar isAdmin={true} history={null}/>
                <AuditoriumDetails callback={this.addAuditorium} buttonText={"ADD"}/>
            </div>
        );
    }
}

export default AddAuditoriumContainer;