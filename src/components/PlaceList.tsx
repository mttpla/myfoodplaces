import React from "react";
import { Place } from "../utils/Type";
import { PlaceCard } from "./PlaceCard";

interface PlacesProps {
  places: Place[];
  currentPlaceId: string | null | undefined;
  onSelect: CallableFunction;
  onSave: CallableFunction;
  onDelete: CallableFunction;
}

export function PlaceList(props: PlacesProps) {
  return (
    <>
      <h4>Places</h4>
      <div>
        {props.places.length === 0 && <p>No events to show</p>}
        {props.places.map((place: Place) => (
          <PlaceCard
            key={place.eventId || "newPlace"}
            place={place}
            editMode={place.eventId === props.currentPlaceId}
            onSave={props.onSave}
            onDelete={props.onDelete}
            onSelect={props.onSelect}
          />
        ))}
      </div>
    </>
  );
}
