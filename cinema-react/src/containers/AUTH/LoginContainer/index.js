import React, { Component } from 'react';
import LoginView from "../../../components/AUTH/LoginView";

import {login} from "../../../API/auth";
import {Route} from "react-router-dom";

class LoginContainer extends Component {

    history = null;

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }


    login(username, password){
        login(username,password,(data) => {
            //TODO: NAVIGATE TO CORRECT PAGE
        })
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (
                    <LoginView login={this.login}/>
                )}}/>
        );
    }
}

export default LoginContainer;