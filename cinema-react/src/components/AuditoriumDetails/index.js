import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../OptionButton";

import './styles.css';

class AuditoriumDetails extends Component {


    state = {
        auditorium: {
            number: "",
            numberOfColumns: 0,
            numberOfRows: 0,
        }
    };

    componentWillMount() {
        if(this.props.auditorium){
            this.setState({
                auditorium: this.props.auditorium,
            })
        }
    }

    render() {
        return (
            <div className="auditoriumDetailsContainer">
                <div className="auditoriumDetailsPageTitle">AUDITORIUM INFORMATION</div>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsTitle">Number:</div>
                <input className="auditoriumInput" value={this.state.auditorium.number} onChange={(event) => {
                    const auditorium = this.state.auditorium;
                    auditorium.number = event.target.value;
                    this.setState({
                        auditorium
                    });
                }}/>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsTitle">Number of columns:</div>
                <input className="auditoriumInput" value={this.state.auditorium.numberOfColumns} onChange={(event) => {
                    const auditorium = this.state.auditorium;
                    auditorium.numberOfColumns = event.target.value;
                    this.setState({
                        auditorium
                    });
                }}/>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsTitle">Number of rows:</div>
                <input className="auditoriumInput" value={this.state.auditorium.numberOfRows} onChange={(event) => {
                    const auditorium = this.state.auditorium;
                    auditorium.numberOfRows = event.target.value;
                    this.setState({
                        auditorium
                    });
                }}/>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsSeparator"/>
                <OptionButton onClick={() => {
                    //TODO: CHECK ALL DATA IS PRESENT
                    this.props.callback(this.state.auditorium);
                }} text={this.props.buttonText}/>
            </div>
        );
    }
}

AuditoriumDetails.propTypes = {
    auditorium: PropTypes.object,
    callback: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default AuditoriumDetails;