# React Facebook Authentication

Component for facebook authentication based on [this](https://github.com/keppelen/react-facebook-login) repository

### Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import FacebookAuth from 'react-fb-auth';

const response = (response) => {
  console.log(response);
}

const fbBtn = ({onClick}) => {
    return <button onClick={onClick}>Login with facebook</button>
}

ReactDOM.render(
  <FacebookAuth
    appId="1032595931187376"
    autoLoad={true}
    fields="name,email,picture"
    component={fbBtn}
    callback={response} />,
  document.getElementById('demo')
);
```

### Component example
```js
import React from 'react';
import FacebookLogin from 'react-facebook-login';

class MyComponent extends React.Component {
  constructor(props) {
      super(props);

      this.response = this.response.bind(this);
  };

  response(response) {
    // Send the token to the server and link the account
    console.log(response);
  };

  render() {
    return (
      <FacebookLogin
        appId="1099597531133376"
        component={({onClick}) => {
            return <button onClick={onClick}>Login with facebook</button>
        }}
        fields="name,email,picture"
        callback={this.response}
      />
    )
  }
}

export default MyComponent;
```


## Parameters

|    params    |     value           |                default value                        |
|:------------:|:-------------------:|:---------------------------------------------------:|
|     appId    |     string          |                Required                             |
|     scope    |     string          |      public_profile, email, user_birthday           |
|     fields   |     string          |              name,email,picture                     |
|   callback   |     function        |             resultFacebookLogin                     |
|   autoLoad   |     boolean         |                  false                              |
|     xfbml    |     boolean         |                  false                              |
|reAuthenticate|     boolean         |                  false                              |
|   btnText    |     string          |           The text of the button                    |
|   btnClassName   |     string      | Class name for the default button                   |
|   version    |     string          |                  2.3                                |
|   language   |     string          |                  en_US                              |
|   component  |     function        |                The button used for the auth         |
