import { useState, useEffect, useRef } from "react";
import './App.css';
import { gapi } from "gapi-script";
import { Config, Place, SearchParams, UserInfoI } from "./Type";
import WelcomePage from "./components/WelcomePage"
import UserInfoSection from "./components/UserInfoSection";
import { CalendarService } from "./services/CalendarService";
import SearchForm from "./components/SearchForm";
import moment from "moment";
import PlaceList from "./components/PlaceList";


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
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    text: "",
    timeMin: moment().subtract(1, 'years').toDate(), 
    timeMax: new Date(),
  });

  const calendar = useRef(new CalendarService());

  /* var place: Place = {
    summary: "Google I/O 2015 mttpla 2022",
    location: "800 Howard St., San Francisco, CA 94103",
    vote: 5, 
    comment: "ricercami", 
    price: 5 },
    date: "2022-08-28T09:00:00-07:00",
    /* start: {
      dateTime: "2022-08-28T09:00:00-07:00",
    },
    end: {
      dateTime: "2022-08-28T17:00:00-07:00",
    }, */
  

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: config.clientId,
        scope: config.scope,
        apiKey: config.apiKey,
        discoveryDocs: config.discoveryDocs,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  useEffect(() => {
    const now: Date = new Date();
    now.setDate(now.getMonth() - 12);
    setSearchParams({
      text: searchParams.text,
      timeMin: now,
      timeMax: searchParams.timeMax,
    });
  }, []);

  useEffect(() =>{
    if (userInfo) {
      calendar.current.init(gapi);
    }
  }, [userInfo])

  useEffect(() => {
    calendar.current
      .getPlaces(searchParams)
      .then((res) => setPlaces(res));
    console.log("App: getPlaces: ", searchParams);
  }, [searchParams]);

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
          <>
            <UserInfoSection
              clientId={config.clientId}
              userInfo={userInfo}
              onLogoutSuccess={onLogoutSuccess}
            />
            <div style={{ padding: "0.5em" }}>
              <div>
                <SearchForm
                  search={searchParams}
                  searchFn={setSearchParams}
                />
                <PlaceList
                  places={places}
                />
              </div>
            </div>
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