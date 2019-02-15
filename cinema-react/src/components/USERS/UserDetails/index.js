import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';
import {emailIsValid} from "../../../utils/dataValidation";
import {USER_ROLES} from "../../../API/users";

class UserDetails extends Component {

    constructor(props){
        super(props);

        this.userDataHasErrors = this.userDataHasErrors.bind(this);
        this.saveUserData = this.saveUserData.bind(this);
        this.handleIsAdminChange = this.handleIsAdminChange.bind(this);
        this.handleChangePasswordCheck = this.handleChangePasswordCheck.bind(this);
        this.renderPasswordSection = this.renderPasswordSection.bind(this);
    }

    state = {
        user: {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: USER_ROLES.USER,
        },

        oldPassword: '',
        repeatPassword: '',
        changePassword: false,

        errors:{
            email: false,
            password: false,
            firstName: false,
            lastName: false,
        }
    };

    componentWillReceiveProps(newProps) {
        if(newProps.user && newProps.user.email && newProps.user.firstName){
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

        if(this.state.changePassword && (!this.state.user.password || !this.state.oldPassword || this.state.user.password !== this.state.repeatPassword)){
            errors.password = true;
        }

        if(this.props.isNewUser && (!this.state.user.password || this.state.user.password !== this.state.repeatPassword)){
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
                this.props.callback(this.state.user.id, this.state.user.email, this.state.user.password,
                    this.state.user.firstName, this.state.user.lastName, this.state.user.role, this.state.oldPassword);
            }
        });
    }

    userDataHasErrors(){
        return this.state.errors.email || this.state.errors.password || this.state.errors.firstName || this.state.errors.lastName;
    }

    handleChangePasswordCheck(){
        this.setState({
            changePassword: !this.state.changePassword,
        });
    }

    handleIsAdminChange(){
        const user = this.state.user;

        user.role = this.state.user.role === USER_ROLES.ADMIN ? USER_ROLES.USER : USER_ROLES.ADMIN;
        this.setState({
            user
        });
    }

    renderPasswordSection(){
        if(this.props.isNewUser){
            return (
                <div>
                    <div className="userDataTitle">Password:</div>
                    <input className="userDataInput" type="password" value={this.state.user.password} onChange={(event) => {
                        const user = this.state.user;
                        user.password = event.target.value;
                        this.setState({
                            user
                        });
                    }}/>
                    {this.state.errors.password ? <div className="userDataErrorMessage">There is an error in the password</div> : null}
                    <div className="userDataSeparator"/>
                    <div className="userDataTitle">Repeat password:</div>
                    <input className="userDataInput" type="password" value={this.state.user.password} onChange={(event) => {
                        const user = this.state.user;
                        user.password = event.target.value;
                        this.setState({
                            user
                        });
                    }}/>
                    {this.state.errors.password ? <div className="userDataErrorMessage">There is an error in the password</div> : null}
                </div>)
        }
        else{
            return (
                <div>
                    <div className="userDataTitle">Change password?</div>
                    <input className="userDataInput" type="checkbox" checked={this.state.changePassword} onChange={this.handleChangePasswordCheck}/>
                    {this.state.changePassword ?
                        <div>
                            <div className="userDataTitle">Old password:</div>
                            <input className="userDataInput" type="password" value={this.state.oldPassword} onChange={(event) => {
                                this.setState({
                                    oldPassword: event.target.value
                                });
                            }}/>
                            {this.state.errors.password ? <div className="userDataErrorMessage">There is an error in the password</div> : null}
                            <div className="userDataSeparator"/>
                            <div className="userDataTitle">New password:</div>
                            <input className="userDataInput" type="password" value={this.state.user.password} onChange={(event) => {
                                const user = this.state.user;
                                user.password = event.target.value;
                                this.setState({
                                    user
                                });
                            }}/>
                            {this.state.errors.password ? <div className="userDataErrorMessage">There is an error in the password</div> : null}
                            <div className="userDataSeparator"/>
                            <div className="userDataTitle">Repeat new password:</div>
                            <input className="userDataInput" type="password" value={this.state.repeatPassword} onChange={(event) => {
                                this.setState({
                                    repeatPassword: event.target.value
                                });
                            }}/>
                            {this.state.errors.password ? <div className="userDataErrorMessage">There is an error in the password</div> : null}
                        </div> : null
                    }
                </div>)
        }
    }

    render() {

        return (
            <div>
                <div className="userDataSeparator"/>
                <div className="userDataSeparator"/>
                <div className="userDataContainer">
                    <div className="userDataPageTitle">Info</div>
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

                    {this.renderPasswordSection()}

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

                    {this.props.isAdmin ? <div>
                        <div className="userDataSeparator"/>
                        <div className="userDataTitle">Is admin?</div>
                        <input className="userDataInput" type="checkbox" checked={this.state.user.role === USER_ROLES.ADMIN} onChange={this.handleIsAdminChange}/>
                    </div> : null}

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
    isAdmin: PropTypes.bool.isRequired,
    isNewUser: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
};

export default UserDetails;