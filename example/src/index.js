import React from 'react';
import ReactDOM from 'react-dom';
import FacebookAuth from 'react-facebook-auth';

const MyFacebookButton = ({ onClick }) => (
  <button onClick={onClick}>
    Login with facebook
  </button>
);

const authenticate = (response) => {
  console.log(response);
  // Api call to server so we can validate the token
};

const App = () => (
  <div>
    <h1>Facebook Auth</h1>
    <FacebookAuth
      appId="532819646927525"
      callback={authenticate}
      component={MyFacebookButton}
    />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
