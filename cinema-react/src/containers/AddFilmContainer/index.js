import React, { Component } from 'react';
import FilmDetails from "../../components/FilmDetails";
import NavBar from "../../components/NavBar";

import {addFilm} from '../../API/films';

class AddFilmContainer extends Component {

    state = {
        id: 0,
    };

    constructor(props){
        super(props);

        this.addFilm = this.addFilm.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        /* TODO: GET FILM BY ID */
    }

    addFilm(newFilm){
        addFilm(newFilm, () => {
            //TODO: NAVIGATE BACK
        });
    }


    render() {
        return (
            <div>
                <NavBar isAdmin={true}/>
                <FilmDetails callback={this.addFilm} buttonText={"ADD"}/>
            </div>
        );
    }
}

export default AddFilmContainer;