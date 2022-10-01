import React from "react";
import { GoogleLogin } from "react-google-login";

interface WelcomePageProps {
  clientId: string;
  onLoginSuccess: CallableFunction;
}

class WelcomePage extends React.Component<WelcomePageProps> {
  onLoginSuccess = (res: any) => {
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
