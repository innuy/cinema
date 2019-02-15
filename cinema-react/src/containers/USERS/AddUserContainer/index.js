import React, { Component } from 'react';
import UserDetails from "../../../components/USERS/UserDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {addUser} from '../../../API/users';
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class AddUserContainer extends Component {

    history = null;

    state = {
        id: 0,

        errorVisible: false,
        errorText: '',
    };

    constructor(props){
        super(props);

        this.addUser = this.addUser.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

    }

    addUser(id, email, password, firstName, lastName, role){
        addUser(email, password, firstName, lastName, role, (success, msg) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                if(msg) {
                    this.setState({
                        errorVisible: true,
                        errorText: msg,
                    });
                }
            }
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <UserDetails isAdmin={true} callback={this.addUser} isNewUser={true}/>
                            {this.state.errorVisible ? <ErrorAlert callback={() => {this.setState({errorVisible: false})}} text={this.state.errorText}/> : null}
                        </div>);}} />
        );
    }
}

export default AddUserContainer;