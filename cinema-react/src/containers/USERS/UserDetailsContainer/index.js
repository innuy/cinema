import React, { Component } from 'react';
import NavBar from "../../../components/GENERAL/NavBar";

import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";
import UserDetails from "../../../components/USERS/UserDetails";
import {editUser, getSingleUser} from "../../../API/users";

class UserDetailsContainer extends Component {

    history = null;

    state = {
        id: null,
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
        if(this.props.match.params.id){
            this.setState({
                id: this.props.match.params.id,
            }, () => {
                this.obtainUserData();
            });
        }
        else{
            this.obtainUserData();
        }
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
                    <NavBar isAdmin={false} history={this.history}/>
                    <UserDetails user={this.state.user} callback={this.editUserInfo}/>
                    {this.state.errorVisible ? <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);}} />
        );
    }
}

export default UserDetailsContainer;