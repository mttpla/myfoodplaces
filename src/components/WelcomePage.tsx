import React from "react";
import { GoogleLogin } from "react-google-login";

interface WelcomePageI {
  clientId: string;
  onLoginSuccess: any;
}

class WelcomePage extends React.Component<WelcomePageI> {
  onLoginSuccess = (res: any) => {
    console.log("success:", res);
    this.props.onLoginSuccess(res.profileObj);
  };

  onLoginFailure = (err: any) => {
    console.log("failed:", err);
  };

  render() {
    return (
      <GoogleLogin
        clientId={this.props.clientId}
        buttonText="Sign in with Google"
        onSuccess={this.onLoginSuccess}
        onFailure={this.onLoginFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    );
  }
}

export default WelcomePage;
