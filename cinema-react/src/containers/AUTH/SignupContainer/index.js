import React, { Component } from 'react';
import SignupView from '../../../components/AUTH/SignupView/index';

import {signUp} from "../../../API/auth";
import {Route} from "react-router-dom";
import {navigate} from "../../../utils/navigation";

class SignUpContainer extends Component {

    history = null;

    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);
        this.navigateToLogin = this.navigateToLogin.bind(this);
    }


    signUp(username, password, firstName, lastName){
        signUp(username,password, firstName, lastName, (success, data) => {
            if(success) {
                navigate(this.history, '/seePresentations');
            }
            else{
                //TODO: HANDLE ERROR
            }
        })
    }

    navigateToLogin(){
        navigate(this.history, '/');
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (
                    <SignupView signUp={this.signUp} navigateToLogin={this.navigateToLogin}/>
                )}}/>
        );
    }
}

export default SignUpContainer;