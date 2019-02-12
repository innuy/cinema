import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import UserView from "../../../components/USERS/UserView";
import {getUsers, deleteUser} from "../../../API/users";
import NavBar from "../../../components/GENERAL/NavBar";
import {navigate} from "../../../utils/navigation";


class UserContainer extends Component {

    state = {
        users: [],
    };

    history = null;

    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
        this.addUser = this.addUser.bind(this);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentWillMount() {
        this.refreshUsers();
    }

    refreshUsers(){
        getUsers((success, data) => {

            if(success) {
                this.setState({
                    users: data,
                });
            }
            else{
                /*TODO: HANDLE ERROR*/
            }
        });
    }

    addUser(){
        navigate(this.history, 'addUser');
    }

    deleteUser(id){
        deleteUser(id, (success) => {
            if(success) {
                this.refreshUsers();
            }
            else{
                /*TODO: HANDLE ERROR FOR DELETION*/
            }
        })
    }

    navigateToDetails(id){
        navigate(this.history, 'user/'+id);
    }

    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={true} history={this.history}/>
                    <UserView users={this.state.users} addUser={this.addUser} deleteUser={this.deleteUser}
                                    navigateToDetails={this.navigateToDetails}/>
                </div>);
            }} />
        );
    }
}

export default UserContainer;