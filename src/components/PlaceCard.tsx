import TextField from "@mui/material/TextField";
import React from "react";
import { Place } from "../Type";

interface PlaceCardProps {
  place: Place;
}

class PlaceCard extends React.Component<PlaceCardProps> {

  render() {
    return (
      <div>
        <TextField
          id="summary"
          label="Summary"
          disabled={true}
          defaultValue={this.props.place.summary}
        />
        
        <TextField
          id="date"
          label="Date"
          disabled={true}
          defaultValue={this.props.place.date}
        />

      </div>
    );
  }
}

export default PlaceCard;
