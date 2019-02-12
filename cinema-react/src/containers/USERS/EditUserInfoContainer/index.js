import React, { Component } from 'react';
import NavBar from "../../../components/GENERAL/NavBar";

import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";
import EditUserInfo from "../../../components/USERS/EditUserInfo";
import {editUser, getSingleUser} from "../../../API/users";

class EditUserInfoContainer extends Component {

    history = null;

    state = {
        user: {},

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    constructor(props){
        super(props);

        this.editUserInfo = this.editUserInfo.bind(this);
        this.hideError = this.hideError.bind(this);
        this.obtainUserData = this.obtainUserData.bind(this);
    }

    componentWillMount() {

        this.obtainUserData();
    }

    obtainUserData(){
        this.hideError();
        getSingleUser(this.state.user.id, (success, user) => {
            if (success){

            }
            else{
                this.setState({
                    errorVisible: true,
                    errorText: "There was an error obtaining user details",
                    errorCallback: this.obtainUserData,
                });
            }
        });
    }

    editUserInfo(userInfo){
        editUser(userInfo, (success) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                this.setState({
                    errorVisible: true,
                    errorText: "There was an error saving the user",
                    errorCallback: this.hideError,
                });
            }
        })
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
                    <EditUserInfo user={this.state.user} callback={this.editUserInfo}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);}} />
        );
    }
}

export default EditUserInfoContainer;