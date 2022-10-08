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
          />

          <TextField
            id="date"
            label="Date"
            disabled={!this.props.editMode}
            defaultValue={this.props.place.date}
          />
        </div>

        {this.props.editMode && (
          <Button
            variant="contained"
            onClick={() => {
              console.log("call on save");
              this.props.onSave(this.props.place);
            }}
          >
            Save
          </Button>
        )}
      </>
    );
  }
}

export default PlaceCard;
