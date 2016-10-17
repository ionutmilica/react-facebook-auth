import React from 'react';
import ReactDOM from 'react-dom';
import FacebookAuth from '../src/FacebookAuth';

const response = (response) => {
  console.log(response);
};

const fbBtn = ({onClick}) => {
  return <button onClick={onClick}>Login</button>
};

ReactDOM.render(
    <FacebookAuth
        appId="532819646927525"
        component={fbBtn}
        fields="name,email,picture"
        callback={response} />,
    document.getElementById('demo')
);