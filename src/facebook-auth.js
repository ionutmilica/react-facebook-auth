import React from 'react';
import PropTypes from 'prop-types';
import { toQueryString, isMobile } from './utils';

class FacebookAuth extends React.Component {
  static propTypes = {
    component: PropTypes.node.isRequired,
    callback: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    isMobile: PropTypes.bool,
    redirectUri: PropTypes.string,
    reAuthenticate: PropTypes.bool,
    disableRedirect: PropTypes.bool,
    scope: PropTypes.string,
    autoLoad: PropTypes.bool,
    fields: PropTypes.string,
    version: PropTypes.string,
    language: PropTypes.string,
    customProps: PropTypes.object
  };
  static defaultProps = {
    redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
    scope: 'public_profile,email',
    xfbml: false,
    cookie: false,
    isMobile: isMobile(),
    reAuthenticate: false,
    fields: 'name',
    version: '2.8',
    language: 'en_US',
    autoLoad: false,
    disableRedirect: false,
  };

  componentDidMount() {
    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    this.setfbAsyncInit();
    this.loadSdkAsynchronously();

    let fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';

      document.body.appendChild(fbRoot);
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

      if (autoLoad || window.location.search.includes('facebookdirect')) {
        window.FB.getLoginStatus(this.checkLoginAfterRefresh);
      }
    };
  }

  loadSdkAsynchronously() {
    const language = this.props.language;
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${language}/all.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  responseApi = (authResponse) => {
    window.FB.api(
      '/me',
      { locale: this.props.language, fields: this.props.fields },
      (me) => {
        this.props.callback({
          ...me,
          ...authResponse,
        });
      },
    );
  };

  checkLoginState = (response) => {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
      return;
    }
    if (this.props.callback) {
      this.props.callback({ status: response.status });
    }
  };

  checkLoginAfterRefresh = (response) => {
    if (response.status === 'unknown') {
      window.FB.login(
        loginResponse => this.checkLoginState(loginResponse),
        true,
      );
    } else {
      this.checkLoginState(response);
    }
  };

  click = () => {
    const {
      scope,
      appId,
      onClick,
      reAuthenticate,
      redirectUri,
      disableRedirect,
      isMobile,
    } = this.props;

    if (typeof onClick === 'function') {
      onClick();
    }

    const params = {
      client_id: appId,
      redirect_uri: redirectUri,
      state: 'facebookdirect',
      scope,
    };

    if (reAuthenticate) {
      params.auth_type = 'reauthenticate';
    }

    if (isMobile && !disableRedirect) {
      window.location.href = `//www.facebook.com/dialog/oauth?${toQueryString(
        params,
      )}`;
    } else {
      window.FB.login(this.checkLoginState, {
        scope,
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
