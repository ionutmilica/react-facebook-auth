import React from 'react';
import PropTypes from 'prop-types';
import { toQueryString, isMobile as isUsingMobile } from './utils';

class FacebookAuth extends React.Component {
  static propTypes = {
    component: PropTypes.node.isRequired,
    callback: PropTypes.func.isRequired,
    onFailure: PropTypes.func,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    isMobile: PropTypes.bool,
    redirectUri: PropTypes.string,
    reAuthenticate: PropTypes.bool,
    disableRedirect: PropTypes.bool,
    scope: PropTypes.string,
    returnScopes: PropTypes.bool,
    autoLoad: PropTypes.bool,
    fields: PropTypes.string,
    version: PropTypes.string,
    language: PropTypes.string,
    customProps: PropTypes.object,
  };
  static defaultProps = {
    redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
    scope: 'public_profile,email',
    onFailure: undefined,
    returnScopes: false,
    xfbml: false,
    cookie: false,
    isMobile: isUsingMobile(),
    reAuthenticate: false,
    reRequest: false,
    fields: 'name,email,picture',
    version: '2.8',
    language: 'en_US',
    autoLoad: false,
    disableRedirect: false,
    customProps: {},
  };

  componentDidMount() {
    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    this.setfbAsyncInit();
    this.loadSdkAsynchronously();

    let rootElem = document.getElementById('fb-root');
    if (!rootElem) {
      rootElem = document.createElement('div');
      rootElem.id = 'fb-root';
      document.body.appendChild(rootElem);
    }
  }

  setfbAsyncInit() {
    const { appId, xfbml, cookie, version, autoLoad } = this.props;
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml,
        cookie,
      });

      if (autoLoad || window.location.search.indexOf('facebookdirect') !== -1) {
        window.FB.getLoginStatus(this.checkLoginAfterRefresh);
      }
    };
  }

  loadSdkAsynchronously() {
    const language = this.props.language;
    ((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/${language}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  responseApi = authResponse => {
    window.FB.api(
      '/me',
      { locale: this.props.language, fields: this.props.fields },
      me => {
        this.props.callback({
          ...me,
          ...authResponse,
        });
      },
    );
  };

  checkLoginState = response => {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
      return;
    }
    if (this.props.onFailure) {
      this.props.onFailure({ status: response.status });
    } else {
      this.props.callback({ status: response.status });
    }
  };

  checkLoginAfterRefresh = response => {
    if (response.status === 'unknown') {
      window.FB.login(
        loginResponse => this.checkLoginState(loginResponse),
        true,
      );
    } else {
      this.checkLoginState(response);
    }
  };

  click = e => {
    const {
      scope,
      returnScopes,
      appId,
      onClick,
      reAuthenticate,
      reRequest,
      redirectUri,
      disableRedirect,
      isMobile,
    } = this.props;

    if (typeof onClick === 'function') {
      onClick(e);
      if (e.defaultPrevented) {
        return;
      }
    }

    const params = {
      client_id: appId,
      redirect_uri: redirectUri,
      state: 'facebookdirect',
      return_scopes: returnScopes,
      scope,
    };

    if (reAuthenticate) {
      params.auth_type = 'reauthenticate';
    }

    if (reRequest) {
      params.auth_type = 'rerequest';
    }

    if (isMobile && !disableRedirect) {
      window.location.href = `//www.facebook.com/dialog/oauth?${toQueryString(
        params,
      )}`;
    } else {
      window.FB.login(this.checkLoginState, {
        scope,
        return_scopes: returnScopes,
        auth_type: params.auth_type,
      });
    }
  };

  render() {
    const { component: Component } = this.props;
    return <Component onClick={this.click} {...this.props.customProps} />;
  }
}

export default FacebookAuth;
