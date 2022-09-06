import React, { useState, useEffect } from "react";
import './App.css';
import { gapi } from "gapi-script";
import ApiCalendar from "react-google-calendar-api";
import WelcomePage from "./components/WelcomePage"
import UserInfoSection from "./components/UserInfoSection";
import Button from "@mui/material/Button";

export interface UserInfoI {
  imageUrl?: string;
  name?: string;
  email?: string;
}

const config = {
  clientId: process.env.REACT_APP_CLIENTID || "missing key",
  apiKey: process.env.REACT_APP_APIKEY || "missing key",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

console.log(process.env.REACT_APP_CLIENTID);

function App() {
  const [userInfo, setUserInfo] = useState<UserInfoI | null >(null);
  const apiCalendar = new ApiCalendar(config);
  apiCalendar.setCalendar(
    "jms0ef3boo401f9aph8qk775h8@group.calendar.google.com"
  );

  var event = {
  'summary': 'Google I/O 2015 mttpla 2022',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2022-08-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2022-08-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  
};

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: config.clientId,
        scope: config.scope,
      });
    };
    gapi.load("client:auth2", initClient);
  });

  useEffect(() => {
    console.log('userInfo: ', userInfo )
    // apiCalendar.listCalendars
  },[userInfo]);

  const onLoginSuccess = (userInfo: UserInfoI) => {
    setUserInfo(userInfo);
  };

  const onLogoutSuccess = () => {
    setUserInfo(null);
  };
  
  
  return (
    <div className="App">
      <header className="App-header">
        {userInfo ? (
          <><UserInfoSection
            clientId={config.clientId}
            userInfo={userInfo}
            onLogoutSuccess={onLogoutSuccess} />
            
            <Button
              onClick={() => {
                apiCalendar
                  .createEvent(event)
                  .then((res: any) => console.log("res: ", res))
                  .catch((e: Error) => console.log("error: ", e));
                }}
              >
              Add event
            </Button>
            </>
        ) : (
          <WelcomePage
            clientId={config.clientId}
            onLoginSuccess={onLoginSuccess}
          />
        )}
      </header>
    </div>
  );

}

export default App;