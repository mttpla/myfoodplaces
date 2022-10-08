import React from "react";
import { Place } from "../utils/Type";
import PlaceCard from "./PlaceCard";

interface PlacesProps {
  places: Place[];
  currentPlaceId: string | null | undefined;
  onSelect: CallableFunction;
  onSave: CallableFunction;
  onDelete: CallableFunction;
}

class PlaceList extends React.Component<PlacesProps> {
  
  render() {
    return (
      <>
        <h4>Places</h4>
        <div>
          {this.props.places.length === 0 && <p>No events to show</p>}
          {this.props.places.map((place: Place) => (
            <PlaceCard
              key={place.eventId || "newPlace"}
              place={place}
              editMode={place.eventId === this.props.currentPlaceId}
              onSave={this.props.onSave}
              onDelete={this.props.onDelete}
              onSelect={this.props.onSelect}
            />
          ))}
        </div>
      </>
    );
  }
}

export default PlaceList;
