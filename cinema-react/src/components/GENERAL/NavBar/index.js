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

    navigate(destination, extra){
        if(extra){
            extra();
        }
        navigate(this.props.history, destination);
    }

    renderElements(){
        const result = [];

        const navOptions = this.props.isAdmin ? ADMIN_NAV : USER_NAV;

        for(let i = 0; i < navOptions.length; i++){
            result.push(<NavBarElement key={"nav_elem_" + i} text={navOptions[i].text} redirection={navOptions[i].redirection}
                handleClick={this.navigate} extra={navOptions[i].extra}/>);
        }

        return result;
    }

    render() {

        return (
            <div className="col-12 navBarContainer rowFullWidth row justify-content-center">
                {this.renderElements()}
            </div>
        );
    }
}

function createNavItem(text, redirection, extra = null){
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