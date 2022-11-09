import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { Place } from "../utils/Type";


interface PlaceCardProps {
  place: Place;
  editMode: boolean;
  onSelect: CallableFunction;
  onSave: CallableFunction;
  onDelete: CallableFunction;
}

class PlaceCard extends React.Component<PlaceCardProps> {
  constructor(props: PlaceCardProps) {
    super(props);
    this.state = {
      place: props.place,
    };
  }

  render() {
    return (
      <>
        <div>
          <TextField
            id="summary"
            label="Summary"
            disabled={!this.props.editMode}
            value={this.props.place.summary}
            onChange={(event) => {
              this.props.place.summary = event.target.value;
              this.setState({ place: this.props.place });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
              disabled={!this.props.editMode}
              label="Date"
              inputFormat="DD/MM/YYYY"
              value={this.props.place.date}
              onChange={(event) => {
                this.props.place.date = event || new Date();
                this.setState({ place: this.props.place });
              }}
              renderInput={(params) => {
                return <TextField {...params} />;
              }}
            />
          </LocalizationProvider>
          <TextField
            id="location"
            label="Location"
            disabled={!this.props.editMode}
            value={this.props.place.location}
            onChange={(event) => {
              this.props.place.location = event.target.value;
              this.setState({ place: this.props.place });
            }}
          />
          <TextField
            id="vote"
            label="Vote"
            type="number"
            disabled={!this.props.editMode}
            value={this.props.place.vote}
            inputProps={{ inputMode: "numeric", min: 0, max: 5 }}
            onChange={(event) => {
              this.props.place.vote = parseInt(event.target.value);
              this.setState({ place: this.props.place });
            }}
          />
          <TextField
            id="price"
            label="Price"
            type="number"
            disabled={!this.props.editMode}
            value={this.props.place.price}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]" }}
            onChange={(event) => {
              this.props.place.price = parseInt(event.target.value);
              this.setState({ place: this.props.place });
            }}
          />
          <TextField
            id="comment"
            label="Comment"
            disabled={!this.props.editMode}
            value={this.props.place.comment}
            multiline
            onChange={(event) => {
              this.props.place.comment = event.target.value;
              this.setState({ place: this.props.place });
            }}
          />
          <TextField
            id="url"
            label="Url"
            disabled={!this.props.editMode}
            value={this.props.place.url}
            onChange={(event) => {
              this.props.place.url = event.target.value;
              this.setState({ place: this.props.place });
            }}
          />
          <TextField
            id="eventId"
            label="ID"
            disabled={true}
            defaultValue={this.props.place.eventId}
          />
        </div>

        <Button
          disabled={!this.props.editMode}
          variant="contained"
          onClick={() => {
            console.log("call on save");
            this.props.onSave(this.props.place);
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          disabled={this.props.editMode}
          onClick={() => {
            console.log("call on select");
            this.props.onSelect(this.props.place);
          }}
        >
          Select
        </Button>

        <Button
          variant="contained"
          disabled={!this.props.editMode}
          onClick={() => {
            console.log("call on cancel");
            this.props.onSelect(undefined);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!this.props.editMode}
          onClick={() => {
            console.log("call on delete");
            this.props.onDelete(this.props.place);
          }}
        >
          Delete
        </Button>
      </>
    );
  }
}

export default PlaceCard;
