import React, {Component} from 'react';
import OptionButton from "../../GENERAL/OptionButton";
import PropTypes from 'prop-types';

import './styles.css';

class LoginView extends Component {

    state = {
        email: "",
        password: "",

        errors: {
            email: false,
            password: false,
        }
    };

    render() {

        return (
            <div className="container">
                <div className="loginDetailsPageTitle">LOGIN</div>
                <div className="loginDetailsContainer">
                    <div className="loginDetailsSeparator"/>
                    <div className="loginDetailsTitle">Email:</div>
                    <input className="loginInput" value={this.state.email} onChange={(event) => {
                        this.setState({
                            email: event.target.value,
                        });
                    }}/>
                    {this.state.errors.email ?
                        <div className="loginDetailsErrorMessage">There is an error in the email</div> : null}
                    <div className="loginDetailsSeparator"/>
                    <div className="loginDetailsTitle">Password:</div>
                    <input type="password" className="loginInput" value={this.state.password} onChange={(event) => {
                        this.setState({
                            password: event.target.value,
                        });
                    }}/>
                    {this.state.errors.password ?
                        <div className="loginDetailsErrorMessage">There is an error in the number of
                            columns</div> : null}
                    <div className="loginDetailsSeparator"/>
                    <OptionButton onClick={() => {
                        this.props.login(this.state.email, this.state.password)
                    }} text={"Login"}/>
                    <div className="loginDetailsSeparator"/>
                    <div className="loginChangeScreenButton" onClick={this.props.navigateToSignup}>Don't have an
                        account? Sign up!
                    </div>
                </div>
                <div className="loginDetailsSeparator"/>
                <div className="loginDetailsSeparator"/>
                <div className="loginDetailsSeparator"/>
            </div>
        );
    }
}

LoginView.propTypes = {
    login: PropTypes.func.isRequired,
    navigateToSignup: PropTypes.func.isRequired,
};


export default LoginView;