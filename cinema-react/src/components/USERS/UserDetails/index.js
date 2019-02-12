import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';
import {emailIsValid} from "../../../utils/dataValidation";

class UserDetails extends Component {

    constructor(props){
        super(props);

        this.userDataHasErrors = this.userDataHasErrors.bind(this);
        this.saveUserData = this.saveUserData.bind(this);
    }

    state = {
        user: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },

        errors:{
            email: false,
            password: false,
            firstName: false,
            lastName: false,
        }
    };

    componentWillReceiveProps(newProps) {
        if(newProps.user){
            this.setState({
                user: newProps.user,
            })
        }
    }

    saveUserData(){

        const errors = {
            email: false,
            password: false,
            firstName: false,
            lastName: false,
        };

        if(!this.state.user.email || !emailIsValid(this.state.user.email)){
            errors.email = true;
        }

        if(!this.state.user.password){
            errors.password = true;
        }

        if(!this.state.user.firstName){
            errors.firstName = true;
        }

        if(!this.state.user.lastName){
            errors.firstName = true;
        }


        this.setState({
            errors,
        }, () => {
            if(!this.userDataHasErrors()) {
                this.props.callback(this.state.user);
            }
        });

    }

    userDataHasErrors(){
        return this.state.errors.email || this.state.errors.password || this.state.errors.firstName || this.state.errors.lastName;
    }

    render() {
        return (
            <div>
                <div className="userDataSeparator"/>
                <div className="userDataSeparator"/>
                <div className="userDataContainer">
                    <div className="userDataPageTitle">Your Info</div>
                    <div className="userDataSeparator"/>
                    <div className="userDataTitle">Email:</div>
                    <input className="userDataInput" value={this.state.user.email} onChange={(event) => {
                        const user = this.state.user;
                        user.email = event.target.value;
                        this.setState({
                            user
                        });
                    }}/>
                    {this.state.errors.email ? <div className="userDataErrorMessage">There is an error in the email</div> : null}
                    <div className="userDataSeparator"/>
                    <div className="userDataTitle">New password:</div>
                    <input className="userDataInput" value={this.state.user.password} onChange={(event) => {
                        const user = this.state.user;
                        user.password = event.target.value;
                        this.setState({
                            user
                        });
                    }}/>
                    {this.state.errors.password ? <div className="userDataErrorMessage">There is an error in the password</div> : null}
                    <div className="userDataSeparator"/>
                    <div className="userDataTitle">First name:</div>
                    <input className="userDataInput" value={this.state.user.firstName} onChange={(event) => {
                        const user = this.state.user;
                        user.firstName = event.target.value;
                        this.setState({
                            user
                        });
                    }}/>
                    {this.state.errors.firstName ? <div className="userDataErrorMessage">There is an error in the first name</div> : null}
                    <div className="userDataSeparator"/>
                    <div className="userDataTitle">Last name:</div>
                    <input className="userDataInput" value={this.state.user.lastName} onChange={(event) => {
                        const user = this.state.user;
                        user.lastName = event.target.value;
                        this.setState({
                            user
                        });
                    }}/>
                    {this.state.errors.lastName ? <div className="userDataErrorMessage">There is an error in the last name</div> : null}
                    <div className="userDataSeparator"/>
                    <div className="userDataSeparator"/>
                    <div className="userDataSeparator"/>
                    <div className="userDataSeparator"/>
                    <OptionButton onClick={this.saveUserData} text={'SAVE'}/>
                </div>
                <div className="userDataSeparator"/>
                <div className="userDataSeparator"/>
            </div>
        );
    }
}

UserDetails.propTypes = {
    user: PropTypes.object,
    callback: PropTypes.func.isRequired,
};

export default UserDetails;