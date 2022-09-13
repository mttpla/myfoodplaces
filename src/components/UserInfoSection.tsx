import React from "react";
import { GoogleLogout } from "react-google-login";
import { UserInfoI } from "../Type"

interface UserInfoSectionProps {
  clientId: string;
  userInfo: UserInfoI;
  onLogoutSuccess: CallableFunction;
}

class UserInfoSection extends React.Component<UserInfoSectionProps> {
  
  onLogoutSuccess = () => {
    this.props.onLogoutSuccess();
  };

  render() {
    return (
      <div>
        <img
          src={this.props.userInfo.imageUrl}
          alt="user"
          referrerPolicy="no-referrer"
        />
        <p>Name: {this.props.userInfo.name}</p>
        <p>Email Address: {this.props.userInfo.email}</p>
        <GoogleLogout
          clientId={this.props.clientId}
          buttonText="Log out"
          onLogoutSuccess={this.onLogoutSuccess}
        />
      </div>
    );
  }
}

export default UserInfoSection;
