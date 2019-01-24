import React, { Component } from 'react';
import SignupView from '../../../components/AUTH/SignupView/index';

import {signup} from "../../../API/auth";
import {Route} from "react-router-dom";

class SignupContainer extends Component {

    history = null;

    constructor(props) {
        super(props);

        this.signup = this.signup.bind(this);
    }


    signup(username, password){
        signup(username,password,(data) => {
            //TODO: NAVIGATE TO PAGE
        })
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (
                    <SignupView signup={this.signup}/>
                )}}/>
        );
    }
}

export default SignupContainer;