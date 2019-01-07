import React, { Component } from 'react';
import FilmDetails from "../../components/FilmDetails";
import NavBar from "../../components/NavBar";

import {editFilm} from "../../API/films";

class FilmDetailsContainer extends Component {

    state = {
        id: 0,
        film: {}
    };

    constructor(props){
        super(props);

        this.editFilm = this.editFilm.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        /* TODO: GET FILM BY ID */
    }

    editFilm(newFilm){
        editFilm(newFilm, () => {
            //TODO: NAVIGATE BACK
        })
    }


    render() {
        return (
            <div>
                <NavBar isAdmin={true}/>
                <FilmDetails film={this.state.film} callback={this.editFilm} buttonText={"EDIT"}/>
            </div>
        );
    }
}

export default FilmDetailsContainer;