import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OptionButton from "../../GENERAL/OptionButton";

import './styles.css';

class AuditoriumDetails extends Component {

    constructor(props){
        super(props);

        this.auditoriumHasErrors = this.auditoriumHasErrors.bind(this);
        this.saveAuditoriumData = this.saveAuditoriumData.bind(this);
    }

    state = {
        auditorium: {
            number: "",
            numberOfColumns: 0,
            numberOfRows: 0,
        },

        errors:{
            number: false,
            numberOfColumns: false,
            numberOfRows: false,
        }
    };

    componentWillReceiveProps(newProps) {
        if(newProps.auditorium){
            this.setState({
                auditorium: newProps.auditorium,
            })
        }
    }

    saveAuditoriumData(){

        const errors = {
            number: false,
            numberOfColumns: false,
            numberOfRows: false
        };

        if(!this.state.auditorium.number){
            errors.number = true;
        }
        if(!this.state.auditorium.numberOfColumns){
            errors.numberOfColumns = true;
        }
        if(!this.state.auditorium.numberOfRows){
            errors.numberOfRows = true;
        }

        this.setState({
            errors,
        }, () => {
            if(!this.auditoriumHasErrors()) {
                this.props.callback(this.state.auditorium);
            }
        });

    }

    auditoriumHasErrors(){
        return this.state.errors.number && this.state.errors.numberOfColumns && this.state.errors.numberOfRows
    }

    render() {
        return (
            <div>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsSeparator"/>
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
                    {this.state.errors.number ? <div className="auditoriumDetailsErrorMessage">There is an error in the number</div> : null}
                    <div className="auditoriumDetailsSeparator"/>
                    <div className="auditoriumDetailsTitle">Number of columns:</div>
                    {this.props.isEdit ? <div className="auditoriumInput">{this.state.auditorium.numberOfColumns}</div>
                        :
                        <input className="auditoriumInput" value={this.state.auditorium.numberOfColumns} onChange={(event) => {
                            const auditorium = this.state.auditorium;
                            auditorium.numberOfColumns = event.target.value;
                            this.setState({
                                auditorium
                            });
                    }}/>}
                    {this.state.errors.numberOfColumns ? <div className="auditoriumDetailsErrorMessage">There is an error in the number of columns</div> : null}
                    <div className="auditoriumDetailsSeparator"/>
                    <div className="auditoriumDetailsTitle">Number of rows:</div>
                    {this.props.isEdit ? <div className="auditoriumInput">{this.state.auditorium.numberOfRows}</div>
                        :
                        <input className="auditoriumInput" value={this.state.auditorium.numberOfRows} onChange={(event) => {
                            const auditorium = this.state.auditorium;
                            auditorium.numberOfRows = event.target.value;
                            this.setState({
                                auditorium
                            });
                    }}/>}
                    {this.state.errors.numberOfRows ? <div className="auditoriumDetailsErrorMessage">There is an error in the number of rows</div> : null}
                    <div className="auditoriumDetailsSeparator"/>
                    <div className="auditoriumDetailsSeparator"/>
                    <div className="auditoriumDetailsSeparator"/>
                    <div className="auditoriumDetailsSeparator"/>
                    <OptionButton onClick={this.saveAuditoriumData} text={this.props.buttonText}/>
                </div>
                <div className="auditoriumDetailsSeparator"/>
                <div className="auditoriumDetailsSeparator"/>
            </div>
        );
    }
}

AuditoriumDetails.propTypes = {
    auditorium: PropTypes.object,
    callback: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
};

export default AuditoriumDetails;