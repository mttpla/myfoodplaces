import React, { useState, useEffect } from "react";
import './App.css';
import { gapi } from "gapi-script";
import { Config, MfpEvent, UserInfoI } from "./Type";
import WelcomePage from "./components/WelcomePage"
import UserInfoSection from "./components/UserInfoSection";
import Button from "@mui/material/Button";
import { CalendarService } from "./services/CalendarService";

const config: Config = {
  clientId: process.env.REACT_APP_CLIENTID || "missing key",
  apiKey: process.env.REACT_APP_APIKEY || "missing key",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

function App() {
  const [userInfo, setUserInfo] = useState<UserInfoI | null >(null);
  let calendar = new CalendarService(gapi);

  var event: MfpEvent = {
    summary: "Google I/O 2015 mttpla 2022",
    location: "800 Howard St., San Francisco, CA 94103",
    description: { vote: 5, comment: "ricercami", price: 5 },
    start: {
      dateTime: "2022-08-28T09:00:00-07:00",
    },
    end: {
      dateTime: "2022-08-28T17:00:00-07:00",
    },
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: config.clientId,
        scope: config.scope,
        apiKey: config.apiKey,
        discoveryDocs: config.discoveryDocs
      });
    };
    gapi.load("client:auth2", initClient);
  });

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
                calendar.createEvent(event)
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