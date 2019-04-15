import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UserElement from '../UserElement';
import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';

class UserView extends Component {

    renderUsers() {
        const result = [];

        for (let i = 0; i < this.props.users.length; i++) {
            result.push(<UserElement key={"user_" + i} user={this.props.users[i]}
                                     deleteUser={this.props.deleteUser} isAdmin={this.props.isAdmin}
                                     navigateToDetails={this.props.navigateToDetails}/>);
        }

        return result
    }


    render() {

        return (
            <div>
                <div className="userViewTitle">All Users</div>
                <div className="row display-flex userViewContainer justify-content-around">
                    {this.renderUsers()}
                </div>
                <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.props.addUser} text={"Add User"}/>
                </div>
            </div>
        );
    }
}

UserView.propTypes = {
    users: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    navigateToDetails: PropTypes.func.isRequired,
};

export default UserView;