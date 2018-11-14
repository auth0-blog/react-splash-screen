import React, {Fragment} from 'react';
import auth0Client from '../Auth';
import Books from './Books';

function VisitorsView() {
  return (
    <Fragment>
      <p>Welcome to the react splash demo. To continue, sign in.</p>
      <button onClick={auth0Client.signIn} className="btn btn-primary">Login</button>
    </Fragment>
  );
}

function AuthenticatedUsersView() {
  return (
    <Books/>
  )
}

function Welcome() {
    return (
      <div className="container">
        { auth0Client.isAuthenticated() && AuthenticatedUsersView() }
        { !auth0Client.isAuthenticated() && VisitorsView() }
      </div>
    )
}


export default Welcome;
