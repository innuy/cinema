import React, { Component } from 'react';
import NavBar from "../../../components/GENERAL/NavBar";

import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";
import UserDetails from "../../../components/USERS/UserDetails";
import {editMyUserData, getMyUserData} from "../../../API/users";
import {changePassword} from "../../../API/users";

class MyUserDetailsContainer extends Component {

    history = null;

    state = {
        id: null,
        user: {},

        errorVisible: false,
        errorText: "",
        errorCallback: null,

        unauthorizedVisible: false,
    };

    constructor(props){
        super(props);

        this.editUserInfo = this.editUserInfo.bind(this);
        this.hideError = this.hideError.bind(this);
        this.obtainMyUserData = this.obtainMyUserData.bind(this);
    }

    componentWillMount() {
        this.obtainMyUserData();
    }

    obtainMyUserData(){
        this.hideError();
        getMyUserData((success, data) => {
            if (success){
                this.setState({
                    user: data
                });
            }
            else{
                if(data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.obtainMyUserData,
                    });
                }
            }
        });
    }

    editUserInfo(id, email, password, firstName, lastName, oldPassword){
        editMyUserData(email, firstName, lastName, (success, msg) => {
            if (success) {
                changePassword(email, oldPassword, password, (passSuccess, passMsg) => {
                    if(passSuccess){
                        navigateBack(this.history);
                    }
                    else {
                        if(passMsg) {
                            this.setState({
                                errorVisible: true,
                                errorText: passMsg,
                                errorCallback: this.hideError,
                            });
                        }
                    }
                });

            } else {
                if(msg) {
                    this.setState({
                        errorVisible: true,
                        errorText: msg,
                        errorCallback: this.hideError,
                    });
                }
            }
        });
    }

    hideError(){
        this.setState({errorVisible: false});
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={false} history={this.history}/>
                    <UserDetails user={this.state.user} callback={this.editUserInfo} isAdmin={false} isNewUser={false}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);}} />
        );
    }
}

export default MyUserDetailsContainer;