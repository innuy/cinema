import React, {Component} from 'react';
import AuditoriumDetails from "../../../components/AUDITORIUMS/AuditoriumDetails";
import NavBar from "../../../components/GENERAL/NavBar";

import {addAuditorium} from '../../../API/auditoriums';
import {Route} from "react-router-dom";
import {navigateBack} from "../../../utils/navigation";
import ErrorAlert from "../../../components/GENERAL/ErrorAlert";

class AddAuditoriumContainer extends Component {

    history = null;

    state = {
        id: 0,
        errorVisible: false,
    };

    constructor(props) {
        super(props);

        this.addAuditorium = this.addAuditorium.bind(this);
    }

    componentWillMount() {

        this.setState({
            id: this.props.match.params.id,
        });

    }

    addAuditorium(newAuditorium) {
        addAuditorium(newAuditorium, (success) => {
            if (success) {
                navigateBack(this.history);
            } else {
                this.setState({
                    errorVisible: true,
                });
            }
        });
    }


    render() {
        return (
            <Route render={({history}) => {
                this.history = history;
                return (<div>
                    <NavBar isAdmin={true} history={this.history}/>
                    <AuditoriumDetails callback={this.addAuditorium} isEdit={false} buttonText={"ADD"}/>
                    {this.state.errorVisible ? <ErrorAlert callback={() => {
                        this.setState({errorVisible: false})
                    }} text={'There was an error'}/> : null}
                </div>);
            }}/>
        );
    }
}

export default AddAuditoriumContainer;