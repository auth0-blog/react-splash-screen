import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import auth0Client from './Auth';

class App extends Component {
  async componentDidMount() {
    try {
      await auth0Client.loadSession();
      setTimeout(() => {
        this.forceUpdate();
      }, 1000)
    } catch (error) {
      console.log(error);
    }
  }

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

export default App;
