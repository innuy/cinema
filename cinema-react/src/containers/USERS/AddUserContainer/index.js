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

    addUser(newUser){
        addUser(newUser, (success) => {
            if(success){
                navigateBack(this.history);
            }
            else{
                this.setState({
                    errorVisible: true,
                });
            }
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                            <NavBar isAdmin={true} history={this.history}/>
                            <UserDetails callback={this.addUser} isEdit={false} buttonText={"ADD"}/>
                            {this.state.errorVisible ? <ErrorAlert callback={() => {this.setState({errorVisible: false})}} text={'There was an error'}/> : null}
                        </div>);}} />
        );
    }
}

export default AddUserContainer;