import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import NavBarElement from "./NavBarElement";
import {navigate} from "../../../utils/navigation";

const ADMIN_NAV = [createNavItem("Films", "/films"), createNavItem("Auditoriums", "/auditoriums"),
    createNavItem("Presentations", "/presentations"), createNavItem("Tickets", "/tickets")];
const USER_NAV = [createNavItem("Presentations", "/seePresentations"), createNavItem("Tickets", "/myTickets"),
    createNavItem("My Info", '/myInfo')];

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.renderElements = this.renderElements.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    navigate(destination){
        navigate(this.props.history, destination);
    }

    renderElements(){
        const result = [];

        const navOptions = this.props.isAdmin ? ADMIN_NAV : USER_NAV;

        for(let i = 0; i < navOptions.length; i++){
            result.push(<NavBarElement key={"nav_elem_" + i} text={navOptions[i].text} redirection={navOptions[i].redirection}
                handleClick={this.navigate}/>);
        }

        return result;
    }

    render() {

        return (
            <div className="col-12 navBarContainer rowFullWidth row">
                {this.renderElements()}
            </div>
        );
    }
}

function createNavItem(text, redirection){
    return {
        text,
        redirection
    }
}

NavBar.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};


export default NavBar;