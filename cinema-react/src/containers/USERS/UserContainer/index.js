import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import UserView from "../../../components/USERS/UserView";
import {getUsers, deleteUser} from "../../../API/users";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";


class UserContainer extends Component {

    state = {
        users: [],

        errorVisible: false,
        errorText: "",
        errorCallback: null,
    };

    history = null;

    constructor(props) {
        super(props);

        this.hideError = this.hideError.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
        this.addUser = this.addUser.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentWillMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        getUsers((success, data) => {
            if (success) {
                this.setState({
                    users: data,
                });
            } else {
                if (data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.refreshUsers,
                    });
                }
            }
        });
    }

    addUser() {
        navigate(this.history, 'addUser');
    }

    deleteUser(id) {
        deleteUser(id, (success, data) => {
            if (success) {
                this.refreshUsers();
            } else {
                if (data) {
                    this.setState({
                        errorVisible: true,
                        errorText: data,
                        errorCallback: this.hideError,
                    });
                }
            }
        })
    }

    hideError() {
        this.setState({errorVisible: false});
    }

    navigateToDetails(id) {
        navigate(this.history, 'user/' + id);
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={true} history={this.history}/>
                    <UserView users={this.state.users} addUser={this.addUser} deleteUser={this.deleteUser}
                              navigateToDetails={this.navigateToDetails}/>
                    {this.state.errorVisible ?
                        <ErrorAlert callback={this.state.errorCallback} text={this.state.errorText}/> : null}
                </div>);
            }}/>
        );
    }
}

export default UserContainer;