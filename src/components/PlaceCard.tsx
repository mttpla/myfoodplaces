import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

  render() {
    return (
      <>
        <div>
          <TextField
            id="summary"
            label="Summary"
            disabled={!this.props.editMode}
            defaultValue={this.props.place.summary}
            onChange={(event) => {
              this.props.place.summary = event.target.value;
            }}
          />

          <TextField
            id="date"
            label="Date"
            disabled={!this.props.editMode}
            defaultValue={this.props.place.date}
          />
          <TextField
            id="eventId"
            label="ID"
            disabled={!this.props.editMode}
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
          disabled={
            this.props.editMode
          }
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
          disabled={
            !this.props.editMode
          }
          onClick={() => {
            console.log("call on save");
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
