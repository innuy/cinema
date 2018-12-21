import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import FirstProcess from "./containers/FirstProcess";

class App extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={FirstProcess}/>
                <Route exact path='/login' component={null}/>
                <Route exact path='/signup' component={null}/>
                {/*ADMIN SCREENS*/}
                <Route exact path='/movies' component={null}/>
                <Route exact path='/auditoriums' component={null}/>
                <Route exact path='/presentations' component={null}/>
                <Route exact path='/tickets' component={null}/>
                {/*USER SCREENS*/}
                <Route exact path='/reservations' component={null}/>

            </Switch>
        </div>
    );
  }
}

export default App;
