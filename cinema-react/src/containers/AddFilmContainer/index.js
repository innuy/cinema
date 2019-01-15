import React, { Component } from 'react';
import FilmDetails from "../../components/FilmDetails";
import NavBar from "../../components/NavBar";

import {addFilm} from '../../API/films';
import {Route} from "react-router-dom";

class AddFilmContainer extends Component {

    history = null;

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
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <FilmDetails callback={this.addFilm} buttonText={"ADD"}/>
                        </div>);}} />
        );
    }
}

export default AddFilmContainer;