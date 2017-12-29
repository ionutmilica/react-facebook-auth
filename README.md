# React Facebook Authentication
[![Build Status](https://travis-ci.org/ionutmilica/react-facebook-auth.svg?branch=master)](https://travis-ci.org/ionutmilica/react-facebook-auth)
[![redux-modal-container](https://img.shields.io/npm/v/react-facebook-auth.svg)](https://www.npmjs.com/package/react-facebook-auth)
[![codecov](https://codecov.io/gh/ionutmilica/react-facebook-auth/branch/master/graph/badge.svg)](https://codecov.io/gh/ionutmilica/react-facebook-auth)

Allows developers to receive a facebook authentication token that can be used by a backend service.

## Installation
To install the latest version:

```
npm install --save react-facebook-auth
```
or
```
yarn add react-facebook-auth
```

### How to use
```js
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
      appId="<app-id>"
      callback={authenticate}
      component={MyFacebookButton}
    />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
```

A full example can be found in [examples](https://github.com/ionutmilica/react-facebook-auth/tree/master/example) directory.

### Available Props
| Params          | Type     | Info                                                                                                                    |
|-----------------|----------|-------------------------------------------------------------------------------------------------------------------------|
| appId           | string   | Facebook application id. Check https://developers.facebook.com                                                          |
| scope           | string   | Comma separated list of extended permissions                                                                            |
| fields          | string   | name,email,picture                                                                                                      |
| callback        | function | Callback triggered when we receive a response from facebook.                                                            |
| onFailure       | function | If provided, will be triggered on failed requests.                                                                      |
| returnScopes    | boolean  | When true, the granted scopes will be returned in a comma-separated list in the grantedScopes field of the authResponse |
| autoLoad        | boolean  | Defaults to: false                                                                                                      |
| xfbml           | boolean  | Defaults to: false                                                                                                      |
| cookie          | boolean  | Defaults to: false                                                                                                      |
| reAuthenticate  | boolean  | Asks the person to re-authenticate unconditionally. Defaults to: false                                                  |
| reRequest       | boolean  | Asks the person again for revoked permissions. Defaults to: false                                                       |
| redirectUri     | string   | Defaults to: '/'                                                                                                        |
| version         | string   | Facebook SDK version. Defaults to: 2.8                                                                                  |
| language        | string   | Defaults to: en_US                                                                                                      |
| disableRedirect | boolean  | Defaults to: false                                                                                                      |
| customProps     | object   | Allows custom props passing to the custom element.                                                                      |
| component       | node     | Custom react element that returns a button element.                                                                     |
### License
MIT
