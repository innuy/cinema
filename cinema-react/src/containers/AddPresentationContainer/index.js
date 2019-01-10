import React, { Component } from 'react';
import PresentationDetails from "../../components/PresentationDetails";
import NavBar from "../../components/NavBar";

import {addPresentation} from '../../API/presentations';
import {Route} from "react-router-dom";

class AddPresentationContainer extends Component {

    history = null;

    state = {
        id: 0,
    };

    constructor(props){
        super(props);

        this.addPresentation = this.addPresentation.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

        /* TODO: GET FILM BY ID */
    }

    addPresentation(newPresentation){
        addPresentation(newPresentation, () => {
            //TODO: NAVIGATE BACK
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={true} history={this.history}/>
                    <PresentationDetails callback={this.addPresentation} buttonText={"ADD"}/>
                </div>);}} />
        );
    }
}

export default AddPresentationContainer;