import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cross from '../../../images/generic/cross.png';

import './styles.css';


class UserElement extends Component {

    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event){
        event.stopPropagation();
        this.props.deleteUser(this.props.user.id);
    }

    render() {

        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 userElementContainer" onClick={() => {
                this.props.navigateToDetails(this.props.user.id);
            }}>
                <img alt={"Delete user"} className="userElementDelete" src={cross} onClick={this.handleDelete}/>
            </div>
        );
    }
}

UserElement.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
    navigateToDetails: PropTypes.func.isRequired,
};


export default UserElement;