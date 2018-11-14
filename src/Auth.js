import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.loadSession = this.loadSession.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getAccessToken() {
    return this.accessToken;
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  loadSession() {
    return new Promise((resolve, reject) => {
      // not returning from Auth0 (no hash)
      if (!window.location.hash) {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) return reject(err);
          if (!authResult || !authResult.idToken || !authResult.accessToken) {
            return resolve(false);
          }
          this.setSession(authResult);
          resolve(true);
        });
        return;
      }

      // returning from Auth0
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        // clear hash
        window.history.replaceState(null, null, ' ');
        this.setSession(authResult);
        resolve(true);
      });
    })
  }

  setSession(authResult) {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    // clear id token, profile, and expiration
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'H5WocKc729qvrAw8L3nKSUN7srQQdIxq',
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
