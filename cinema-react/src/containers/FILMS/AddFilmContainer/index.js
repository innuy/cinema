import React, { Component } from 'react';
import FilmDetails from "../../../components/FILMS/FilmDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {addFilm} from '../../../API/films';
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class AddFilmContainer extends Component {

    history = null;

    state = {
        id: 0,
        errorVisible: false,
    };

    constructor(props){
        super(props);

        this.addFilm = this.addFilm.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });
    }

    addFilm(newFilm){
        addFilm(newFilm, (success, data) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                this.setState({
                    errorVisible: true,
                });
            }
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <FilmDetails callback={this.addFilm} buttonText={"ADD"}/>
                            {this.state.errorVisible ? <ErrorAlert callback={() => {this.setState({errorVisible: false})}} text={'There was an error'}/> : null}
                        </div>);}} />
        );
    }
}

export default AddFilmContainer;