import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PresentationElement from '../PresentationElement';
import OptionButton from "../OptionButton";


import './styles.css';

class PresentationView extends Component {

    renderPresentations(){
        const result = [];

        for(let i = 0; i < this.props.presentations.length; i++){
            result.push(<PresentationElement key={"presentation_"+i} presentation={this.props.presentations[i]} deletePresentation={this.props.deletePresentation} isAdmin={this.props.isAdmin}/>);
        }

        return result
    }


    render() {

        return (
            <div>
                <div className="presentationViewTitle">All Presentations</div>
                <div className="row presentationViewContainer justify-content-center">
                    {this.renderPresentations()}
                </div>
                {this.props.isAdmin ? <div className="row col-lg-2 offset-lg-5 col-sm-4 offset-sm-4">
                    <OptionButton onClick={this.props.addPresentation} text={"Add Presentation"}/>
                </div> : null}
            </div>
        );
    }
}

PresentationView.propTypes = {
    presentations: PropTypes.array.isRequired,
    addPresentation: PropTypes.func.isRequired,
    deletePresentation: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default PresentationView;