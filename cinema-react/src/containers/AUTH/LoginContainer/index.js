import React, {Component} from 'react';
import LoginView from "../../../components/AUTH/LoginView";

import {login} from "../../../API/auth";
import {Route} from "react-router-dom";
import {navigate} from "../../../utils/navigation";
import {USER_ROLES} from "../../../API/users";

class LoginContainer extends Component {

    history = null;

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.navigateToSignup = this.navigateToSignup.bind(this);
    }


    login(username, password) {
        login(username, password, (success, data) => {
            if (success) {
                if (data.role === USER_ROLES.USER) {
                    navigate(this.history, '/seePresentations');
                } else {
                    navigate(this.history, 'films');
                }
            } else {
                //TODO: HANDLE ERROR
            }
        })
    }

    navigateToSignup() {
        navigate(this.history, '/signUp');
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (
                    <LoginView login={this.login} navigateToSignup={this.navigateToSignup}/>
                )
            }}/>
        );
    }
}

export default LoginContainer;