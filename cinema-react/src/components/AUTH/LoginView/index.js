import React, {Component} from 'react';
import OptionButton from "../../GENERAL/OptionButton";
import PropTypes from 'prop-types';

import './styles.css';

class LoginView extends Component {

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
                <div className="loginDetailsPageTitle">LOGIN</div>
                <div className="loginDetailsContainer">
                    <div className="loginDetailsSeparator"/>
                    <div className="loginDetailsTitle">Username:</div>
                    <input className="loginInput" value={this.state.username} onChange={(event) => {
                        this.setState({
                            username: event.target.value,
                        });
                    }}/>
                    {this.state.errors.username ? <div className="loginDetailsErrorMessage">There is an error in the username</div> : null}
                    <div className="loginDetailsSeparator"/>
                    <div className="loginDetailsTitle">Password:</div>
                    <input className="loginInput" value={this.state.password} onChange={(event) => {
                        this.setState({
                            password: event.target.value,
                        });
                    }}/>
                    {this.state.errors.password ? <div className="loginDetailsErrorMessage">There is an error in the number of columns</div> : null}
                    <div className="loginDetailsSeparator"/>
                    <OptionButton onClick={this.props.login} text={"Login"}/>
                    <div className="loginDetailsSeparator"/>
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
};


export default LoginView;