import React, { Component } from 'react';
import NavBar from "../../../components/GENERAL/NavBar";

import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";
import UserDetails from "../../../components/USERS/UserDetails";
import {editUser, getMyUserData, getSingleUser} from "../../../API/users";
import {changePassword} from "../../../API/users";

class UserDetailsContainer extends Component {

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
        this.obtainUserData = this.obtainUserData.bind(this);
        this.obtainMyUserData = this.obtainMyUserData.bind(this);
    }

    componentWillMount() {
        if(this.props.match.params.id){
            this.setState({
                id: this.props.match.params.id,
            }, () => {
                this.obtainUserData();
            });
        }
    }

    obtainUserData(){
        this.hideError();
        getSingleUser(this.state.id, (success, data) => {
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
                        errorCallback: this.obtainUserData,
                    });
                }
            }
        });
    }

    obtainMyUserData(){
        this.hideError();
        getMyUserData((success, user) => {
            if (success){
                this.setState({
                    user
                });
            }
            else{
                this.setState({
                    errorVisible: true,
                    errorText: "There was an error obtaining your details",
                    errorCallback: this.obtainMyUserData,
                });
            }
        });
    }

    editUserInfo(id, email, password, firstName, lastName, role, oldPassword){
        editUser(id, email, firstName, lastName, role, (success, msg) => {
            if (success) {
                if(oldPassword){
                    changePassword(email, oldPassword, password, (passSuccess, passMsg) => {
                        if(passSuccess){
                            navigateBack(this.history);
                        }
                        else{
                            if(passMsg) {
                                this.setState({
                                    errorVisible: true,
                                    errorText: passMsg,
                                    errorCallback: this.hideError,
                                });
                            }
                        }
                    });
                }
                else{
                    navigateBack(this.history);
                }

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
                    <NavBar isAdmin={true} history={this.history}/>
                    <UserDetails user={this.state.user} callback={this.editUserInfo} isAdmin={true} isNewUser={false}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);}} />
        );
    }
}

export default UserDetailsContainer;