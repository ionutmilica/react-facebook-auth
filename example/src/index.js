import React from 'react';
import ReactDOM from 'react-dom';
import FacebookAuth from 'react-facebook-auth';

const btnStyles = {
  backgroundColor: '#008CBA',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
};

const MyFacebookButton = ({ onClick, styles }) => (
  <button onClick={onClick} style={styles}>
    Login with facebook
  </button>
);

const authenticate = response => {
  console.log(response);
};

const App = () => (
  <div>
    <h1>Facebook Auth</h1>
    <FacebookAuth
      appId="532476480295175"
      callback={authenticate}
      component={MyFacebookButton}
      customProps={{ styles: btnStyles }}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
