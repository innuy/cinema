import React, {Component} from 'react';

import './styles.css';
import {navigate} from "../../../utils/navigation";
import {Route} from "react-router-dom";
import {resetAuthorization} from "../../../App";


class UnauthorizedAlert extends Component {

    history = null;

    constructor(props) {
        super(props);

        this.navigateToOrigin = this.navigateToOrigin.bind(this);
    }

    navigateToOrigin() {
        navigate(this.history, '/');
        resetAuthorization();
    }

    render() {

        return (
            <Route render={({history}) => {
                this.history = history;
                return (
                    <div className="col-12 unauthorizedAlertContainer">
                        <div className="col-6 offset-3 unauthorizedAlertInnerContainer">
                            <div className="unauthorizedAlertText">You are not authorized to access this page</div>
                            <button className="unauthorizedAlertButton" onClick={this.navigateToOrigin}>Ok</button>
                        </div>
                    </div>);
            }}/>);
    }
}


export default UnauthorizedAlert;