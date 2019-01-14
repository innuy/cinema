import React, {Component} from 'react';
import './styles.css';

class FirstView extends Component {


    render() {

        return (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 firstViewContainer" onClick={this.handleClick}>
                THIS IS THE FIRST INDEX
            </div>
        );
    }
}


export default FirstView;