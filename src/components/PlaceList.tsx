import React from "react";
import { Place } from "../Type";
import PlaceCard from "./PlaceCard";

interface PlacesProps {
  places: Place[];
}

class PlaceList extends React.Component<PlacesProps> {

  render() {
    return (
      <><h4>Places</h4><div>
        {this.props.places.length === 0 && <p>No events to show</p>}
        {this.props.places.map((place: Place) => (
          <PlaceCard
            key={place.eventId}
            place={place} />
        ))}
      </div></>
    );
  }
}

export default PlaceList;
