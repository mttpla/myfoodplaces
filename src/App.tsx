import React, { useState, useEffect } from "react";
import './App.css';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import ApiCalendar from "react-google-calendar-api";


interface UserInfo {
  imageUrl?: string;
  name?: string;
  email?: string;
}

const config = {
    clientId:
      "949082335257-cnpnbt41a8hh86o9dqpljndm6o0920cg.apps.googleusercontent.com",
    apiKey: "AIzaSyDQlrJCaFgj8VzQHXA-hHHc1Q_wofPNL0I",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  };

// const apiCalendar: ApiCalendar = new ApiCalendar(config);

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null >(null);
  const apiCalendar = new ApiCalendar(config);
  apiCalendar.setCalendar("mttpla@gmail.com");

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: config.clientId,
        scope: config.scope,
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onLoginSuccess = (res: any) => {
      console.log('success:', res);
      setUserInfo(res.profileObj);
      apiCalendar.listUpcomingEvents(10).then(({ result }: any) => {
        console.log(result.items);
      });
    };
  
  const onLoginFailure = (err: any) => {
      console.log('failed:', err);
    };
  
  const onLogoutSuccess = () => {
      setUserInfo(null);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {userInfo ? (
          <div>
            <img
              src={userInfo.imageUrl}
              alt="user"
              referrerPolicy="no-referrer"
            />
            <p>Name: {userInfo.name}</p>
            <p>Email Address: {userInfo.email}</p>
            <GoogleLogout
              clientId={config.clientId}
              buttonText="Log out"
              onLogoutSuccess={onLogoutSuccess}
            />
          </div>
        ) : (
          <GoogleLogin
            clientId={config.clientId}
            buttonText="Sign in with Google"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        )}
      </header>
    </div>
  );

}

export default App;