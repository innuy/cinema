import React, {Component} from 'react';
import OptionButton from "../../GENERAL/OptionButton";
import PropTypes from 'prop-types';

import './styles.css';

class SignupView extends Component {

    state = {
        username: "",
        password: "",

        errors: {
            username: false,
            password: false,
        }
    };

    render() {

        return (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" onClick={this.handleClick}>
                <div className="signUpDetailsPageTitle">SIGN UP</div>
                <div className="signUpDetailsContainer">
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpDetailsTitle">Username:</div>
                    <input className="signUpInput" value={this.state.username} onChange={(event) => {
                        this.setState({
                            username: event.target.value,
                        });
                    }}/>
                    {this.state.errors.username ? <div className="signUpDetailsErrorMessage">There is an error in the username</div> : null}
                    <div className="signUpDetailsSeparator"/>
                    <div className="signUpDetailsTitle">Password:</div>
                    <input className="signUpInput" value={this.state.password} onChange={(event) => {
                        this.setState({
                            password: event.target.value,
                        });
                    }}/>
                    {this.state.errors.password ? <div className="signUpDetailsErrorMessage">There is an error in the number of columns</div> : null}
                    <div className="signUpDetailsSeparator"/>
                    <OptionButton onClick={this.props.signUp} text={"Sign up"}/>
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