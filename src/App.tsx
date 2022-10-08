import { useState, useEffect, useRef } from "react";
import './App.css';
import { gapi } from "gapi-script";
import { Config, Place, SearchParams, FeedbackMessage, UserInfoI } from "./utils/Type";
import {
  defaultFeedbackMessage,
  defaultPlace,
  genericErrorMessage,
  genericSuccessMessage,
} from "./utils/Constants";
import WelcomePage from "./components/WelcomePage"
import UserInfoSection from "./components/UserInfoSection";
import { CalendarService } from "./services/CalendarService";
import SearchForm from "./components/SearchForm";
import moment from "moment";
import PlaceList from "./components/PlaceList";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


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
  const [currentPlaceId, setCurrentPlaceId] = useState<string | undefined | null>(null);
  const calendar = useRef(new CalendarService());

  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage>(defaultFeedbackMessage);


  const handleFeedbackMessageClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setFeedbackMessage(defaultFeedbackMessage);
  };

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

  useEffect(() =>{
    if (userInfo) {
      calendar.current.init(gapi);
    }
  }, [userInfo])

  useEffect(() => {
    updatePlaces();
    console.log("App: getPlaces: ", searchParams);
    setCurrentPlaceId(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  

  const onLoginSuccess = (userInfo: UserInfoI) => {
    console.log("set user");
    setUserInfo(userInfo);
  };

  const onLogoutSuccess = () => {
    console.log("set user to null");
    setUserInfo(null);
  };

  function updatePlaces(): void {
    calendar.current
      .getPlaces(searchParams)
      .then((res) => {
        setPlaces(res);
        setFeedbackMessage({
          open: true,
          text: genericSuccessMessage,
          severity: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setFeedbackMessage({
          open: true,
          text: e.result?.error?.message || genericErrorMessage,
          severity: "error",
        });
      });
    console.log("App: getPlaces: ", searchParams);
  }


  const onSave = (place: Place) => {
    console.log("onSave: ", place);
    calendar.current
      .createPlace(place)
      .then(() => {
        setFeedbackMessage({
          open: true,
          text: "Saved",
          severity: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setFeedbackMessage({
          open: true,
          text: e.result?.error?.message || genericErrorMessage,
          severity: "error",
        });
      });
    updatePlaces();
    setCurrentPlaceId(null);
  };

  const onDelete = (place: Place) => {
    console.log("onDelete: ", place);
    updatePlaces();
    setCurrentPlaceId(null);
  };

  const onSelect = (placeId: string) => {
    console.log("onSelect: ", placeId);
    setCurrentPlaceId(placeId);
  }

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
                <SearchForm search={searchParams} searchFn={setSearchParams} />
                <PlaceList
                  places={places}
                  onSelect={onSelect}
                  onSave={onSave}
                  onDelete={onDelete}
                  currentPlaceId={currentPlaceId}
                />
              </div>
            </div>

            <Fab
              disabled={currentPlaceId === undefined}
              onClick={() => {
                console.log("FAB");
                const placeList: Place[] = [defaultPlace, ...places];
                setPlaces(placeList);
                setCurrentPlaceId(undefined);
              }}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
            <Snackbar open={feedbackMessage.open} 
              autoHideDuration={6000} 
              onClose={handleFeedbackMessageClose}>
              <Alert
                onClose={handleFeedbackMessageClose}
                severity={feedbackMessage.severity}
                sx={{ width: "100%" }}
              >
                {feedbackMessage.text}
              </Alert>
            </Snackbar>
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