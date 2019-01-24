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
                <div className="signupDetailsPageTitle">SIGN UP</div>
                <div className="signupDetailsContainer">
                    <div className="signupDetailsSeparator"/>
                    <div className="signupDetailsTitle">Username:</div>
                    <input className="signupInput" value={this.state.username} onChange={(event) => {
                        this.setState({
                            username: event.target.value,
                        });
                    }}/>
                    {this.state.errors.username ? <div className="signupDetailsErrorMessage">There is an error in the username</div> : null}
                    <div className="signupDetailsSeparator"/>
                    <div className="signupDetailsTitle">Password:</div>
                    <input className="signupInput" value={this.state.password} onChange={(event) => {
                        this.setState({
                            password: event.target.value,
                        });
                    }}/>
                    {this.state.errors.password ? <div className="signupDetailsErrorMessage">There is an error in the number of columns</div> : null}
                    <div className="signupDetailsSeparator"/>
                    <OptionButton onClick={this.props.signup} text={"Sign up"}/>
                    <div className="signupDetailsSeparator"/>
                </div>
                <div className="signupDetailsSeparator"/>
                <div className="signupDetailsSeparator"/>
                <div className="signupDetailsSeparator"/>
            </div>
        );
    }
}

SignupView.propTypes = {
    signup: PropTypes.func.isRequired,
};


export default SignupView;