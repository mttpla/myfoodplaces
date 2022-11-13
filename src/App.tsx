import { useState, useEffect, useRef } from "react";
import './App.css';
import { gapi } from "gapi-script";
import { Config, Place, SearchParams, FeedbackMessage, UserInfoI } from "./utils/Type";
import {
  defaultFeedbackMessage,
  defaultPlace,
  errorFeedbackMessage,
  genericErrorMessage,
  successFeedbackMessage
} from "./utils/Constants";
import { WelcomePage } from "./components/WelcomePage"
import UserInfoSection from "./components/UserInfoSection";
import { CalendarService } from "./services/CalendarService";
import SearchForm from "./components/SearchForm";
import moment from "moment";
import { PlaceList } from "./components/PlaceList";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useGoogleLogout } from "react-google-login";
import "./utils/I18n";
import { useTranslation } from "react-i18next";




const config: Config = {
  clientId: process.env.REACT_APP_CLIENTID || "missing key",
  apiKey: process.env.REACT_APP_APIKEY || "missing key",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

function App() {
  const { t } = useTranslation();
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

  const onLoginSuccess = (userInfo: UserInfoI) => {
    console.log("set user");
    setUserInfo(userInfo);
  };

  const onLogoutSuccess = () => {
    console.log("set user to null");
    setUserInfo(null);
  };

  const { signOut } = useGoogleLogout({
    clientId: config.clientId,
    onLogoutSuccess: onLogoutSuccess,
  });

  const handleFeedbackMessageClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setFeedbackMessage(defaultFeedbackMessage);
  };

  useEffect(() => {
    const initClient = () => {
      console.log("APP: initClient")
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
        calendar.current.init(gapi).then(() => {
          console.log("App: Init calendar success!");
        }).catch((e) =>{
          console.log("App: Init calendar failed! Error: ", e);
          signOut()
        });
    }
  }, [userInfo, signOut])

  useEffect(() => {
    updatePlaces();
    console.log("App: getPlaces: ", searchParams);
    setCurrentPlaceId(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  function updatePlaces(): void {
    calendar.current
      .getPlaces(searchParams)
      .then((res) => setPlaces(res))
      .catch((e) => {
        console.log(e);
        setFeedbackMessage({
          ...errorFeedbackMessage,
          text: e.result?.error?.message || genericErrorMessage,
        });
      });
    console.log("App: getPlaces: ", searchParams);
  }


  const onSave = (place: Place) => {
    console.log("onSave: ", place);
    calendar.current
      .savePlace(place)
      .then(() => {
        setCurrentPlaceId(null);
        setFeedbackMessage({
          ...successFeedbackMessage,
          text: t('t.saved'),
        }); 
      })
      .catch((e) => {
        console.log(e);
        setFeedbackMessage({
          ...errorFeedbackMessage,
          text: e.result?.error?.message || t(genericErrorMessage),
        });
      });
  };

  const onDelete = (place: Place) => {
    console.log("onDelete: ", place.eventId);
    if(!place.eventId){
      setFeedbackMessage({
        ...errorFeedbackMessage,
        text: t("t.deleteFailed"),
      });
      return;
    }
    calendar.current
      .deletePlace(place.eventId)
      .then(() => {
        setPlaces(places.filter((obj) => obj.eventId !== place.eventId));
        setCurrentPlaceId(null);
        setFeedbackMessage({
          ...successFeedbackMessage,
          text: t('t.deleted'),
        });
      })
      .catch((e) => {
        console.log(e);
        setFeedbackMessage({
          ...errorFeedbackMessage,
          text: e.result?.error?.message || genericErrorMessage,
        });
      });
    updatePlaces();
    setCurrentPlaceId(null);
  };

  const onSelect = (place: Place) => {
    console.log("onSelect: ", place)
    if(place && place.eventId){
      setCurrentPlaceId(place.eventId);
    }else{
      console.log("onSelect:  set current placeId to undefined");
      updatePlaces();
      setCurrentPlaceId(null);
    }
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
                {currentPlaceId === null && (
                  <SearchForm
                    search={searchParams}
                    searchFn={setSearchParams}
                  />
                )}
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
              disabled={!(currentPlaceId === null)}
              onClick={() => {
                const placeList: Place[] = [{...defaultPlace}, ...places];
                setPlaces(placeList);
                setCurrentPlaceId(undefined);
              }}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
            <Snackbar
              open={feedbackMessage.open}
              autoHideDuration={feedbackMessage.autoHideDuration}
              onClose={handleFeedbackMessageClose}
            >
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