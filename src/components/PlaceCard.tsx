import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useState } from "react";
import { Place } from "../utils/Type";


interface PlaceCardProps {
  place: Place;
  editMode: boolean;
  onSelect: CallableFunction;
  onSave: CallableFunction;
  onDelete: CallableFunction;
}

export function PlaceCard(props: PlaceCardProps) {
    
  const [place, setPlace] = useState<Place>(props.place);
    
  return (
    <>
          <div>
            <TextField
              id="summary"
              label="Summary"
              disabled={!props.editMode}
              value={place.summary}
              onChange={(event) => {
                place.summary = event.target.value;
                setPlace({...place});
              }}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
                disabled={!props.editMode}
                label="Date"
                inputFormat="DD/MM/YYYY"
                value={place.date}
                onChange={(event) => {
                  place.date = event || new Date();
                  setPlace({ ...place });
                }}
                renderInput={(params) => {
                  return <TextField {...params} />;
                }}
              />
            </LocalizationProvider>
            <TextField
              id="location"
              label="Location"
              disabled={!props.editMode}
              value={place.location}
              onChange={(event) => {
                place.location = event.target.value;
                setPlace({ ...place });
              }}
            />
            <TextField
              id="vote"
              label="Vote"
              type="number"
              disabled={!props.editMode}
              value={place.vote}
              inputProps={{ inputMode: "numeric", min: 0, max: 5 }}
              onChange={(event) => {
                place.vote = parseInt(event.target.value);
                setPlace({ ...place });
              }}
            />
            <TextField
              id="price"
              label="Price"
              type="number"
              disabled={!props.editMode}
              value={place.price}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]" }}
              onChange={(event) => {
                place.price = parseInt(event.target.value);
                setPlace({ ...place });
              }}
            />
            <TextField
              id="comment"
              label="Comment"
              disabled={!props.editMode}
              value={place.comment}
              multiline
              onChange={(event) => {
                place.comment = event.target.value;
                setPlace({ ...place });
              }}
            />
            <TextField
              id="url"
              label="Url"
              disabled={!props.editMode}
              value={place.url}
              onChange={(event) => {
                place.url = event.target.value;
                setPlace({ ...place });
              }}
            />
            <TextField
              id="eventId"
              label="ID"
              disabled={true}
              defaultValue={place.eventId}
            />
          </div>

          <Button
            disabled={!props.editMode}
            variant="contained"
            onClick={() => {
              console.log("call on save");
              props.onSave(place);
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            disabled={props.editMode}
            onClick={() => {
              console.log("call on select");
              props.onSelect(place);
            }}
          >
            Select
          </Button>

          <Button
            variant="contained"
            disabled={!props.editMode}
            onClick={() => {
              console.log("call on cancel");
              props.onSelect(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!props.editMode}
            onClick={() => {
              console.log("call on delete");
              props.onDelete(place);
            }}
          >
            Delete
          </Button>
        </>
      );
    }
