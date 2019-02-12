import React, {Component} from 'react';
import OptionButton from "../../GENERAL/OptionButton";
import PropTypes from 'prop-types';

import './styles.css';
import {emailIsValid} from "../../../utils/dataValidation";

class SignupView extends Component {

    state = {
        email: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: "",

        errors: {
            email: false,
            password: false,
            repeatPassword: false,
            firstName: false,
            lastName: false,
        }
    };

    constructor(props){
        super(props);

        this.signUp = this.signUp.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
    }

    signUp(){

        const errors = {
            email: false,
            password: false,
            repeatPassword: false,
            firstName: false,
            lastName: false,
        };

        if(!this.state.email || !emailIsValid(this.state.email)){
            errors.email = true;
        }

        if(!this.state.password){
            errors.password = true;
        }

        if(this.state.password !== this.state.repeatPassword){
            errors.repeatPassword = true;
        }

        if(!this.state.firstName){
            errors.firstName = true;
        }

        if(!this.state.lastName){
            errors.lastName = true;
        }

        this.setState({
            errors
        },() => {
            if(!this.hasErrors()){
                this.props.signUp();
            }
        });
    }

    hasErrors(){
        return this.state.errors.email || this.state.errors.password || this.state.errors.repeatPassword || this.state.errors.firstName || this.state.errors.lastName
    }

    render() {

        return (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" onClick={this.handleClick}>
                <div className="signUpDetailsPageTitle">SIGN UP</div>
                <div className="signUpDetailsContainer">
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpDetailsTitle">Email:</div>
                    <input className="signUpInput" value={this.state.email} onChange={(event) => {
                        this.setState({
                            email: event.target.value,
                        });
                    }}/>
                    {this.state.errors.email ? <div className="signUpDetailsErrorMessage">There is an error in the email</div> : null}
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpDetailsTitle">Password:</div>
                    <input type="password" className="signUpInput" value={this.state.password} onChange={(event) => {
                        this.setState({
                            password: event.target.value,
                        });
                    }}/>
                    {this.state.errors.password ? <div className="signUpDetailsErrorMessage">There is an error in the password</div> : null}
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpDetailsTitle">Repeat password:</div>
                    <input type="password" className="signUpInput" value={this.state.repeatPassword} onChange={(event) => {
                        this.setState({
                            repeatPassword: event.target.value,
                        });
                    }}/>
                    {this.state.errors.repeatPassword ? <div className="signUpDetailsErrorMessage">Passwords are not the same</div> : null}
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpDetailsTitle">First name:</div>
                    <input type="password" className="signUpInput" value={this.state.firstName} onChange={(event) => {
                        this.setState({
                            firstName: event.target.value,
                        });
                    }}/>
                    {this.state.errors.firstName ? <div className="signUpDetailsErrorMessage">There is an error with the first name</div> : null}
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpDetailsTitle">Last name:</div>
                    <input type="password" className="signUpInput" value={this.state.lastName} onChange={(event) => {
                        this.setState({
                            lastName: event.target.value,
                        });
                    }}/>
                    {this.state.errors.lastName ? <div className="signUpDetailsErrorMessage">There is an error with the last name</div> : null}
                    <div className="signUpDetailsSeparator"/>
                    <OptionButton onClick={this.signUp} text={"Sign up"}/>
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpChangeScreenButton" onClick={this.props.navigateToLogin}>Already have an account? Login!</div>
                </div>
                <div className="signUpDetailsSeparator"/>
                <div className="signUpDetailsSeparator"/>
                <div className="signUpDetailsSeparator"/>
            </div>
        );
    }
}

SignupView.propTypes = {
    signUp: PropTypes.func.isRequired,
    navigateToLogin: PropTypes.func.isRequired,
};


export default SignupView;