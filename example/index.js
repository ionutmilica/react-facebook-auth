import React from 'react';
import ReactDOM from 'react-dom';
import FacebookAuth from '../src/FacebookAuth';

const response = (response) => {
  console.log(response);
};

const fbBtn = ({onClick}) => {
  return <button onClick={onClick}>Login with facebook</button>
};

ReactDOM.render(
    <FacebookAuth
        appId="1032595931187376"
        fields="name,email,picture"
        component={fbBtn}
        callback={response} />,
    document.getElementById('demo')
);