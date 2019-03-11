import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import NavBarElement from "./NavBarElement";
import {navigate} from "../../../utils/navigation";
import {deleteUserToken} from "../../../utils/cookieStorage";

const ADMIN_NAV = [createNavItem("Films", "/films"), createNavItem("Auditoriums", "/auditoriums"),
    createNavItem("Presentations", "/presentations"), createNavItem("Tickets", "/tickets"),
    createNavItem("Users", "/users"), createNavItem("Dashboard", "/dashboard"), createNavItem("Logout", '/', deleteUserToken)];
const USER_NAV = [createNavItem("Presentations", "/seePresentations"), createNavItem("Tickets", "/myTickets"),
    createNavItem("My Info", '/myInfo'), createNavItem("Logout", '/', deleteUserToken)];

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.renderElements = this.renderElements.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    navigate(destination, extra) {
        if (extra) {
            extra();
        }
        navigate(this.props.history, destination);
    }

    renderElements() {
        const result = [];

        const navOptions = this.props.isAdmin ? ADMIN_NAV : USER_NAV;

        for (let i = 0; i < navOptions.length; i++) {
            result.push(<NavBarElement key={"nav_elem_" + i} text={navOptions[i].text}
                                       redirection={navOptions[i].redirection}
                                       handleClick={this.navigate} extra={navOptions[i].extra}/>);
        }

        return result;
    }

// <div className="col-12  rowFullWidth row justify-content-center">
// </div>
    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light navBarContainer">
                <span className="navbar-brand">Innuy</span>
                <button className="navbar-toggler mr-2" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {this.renderElements()}
                    </ul>
                </div>
            </nav>
        );
    }
}


function createNavItem(text, redirection, extra = null) {
    return {
        text,
        redirection,
        extra
    }
}

NavBar.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};


export default NavBar;