import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import withSplashScreen from './components/withSplashScreen';

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="container-fluid">
          <Route path="/" exact component={Welcome} />
        </div>
      </Fragment>
    );
  }
}

export default withSplashScreen(App);
