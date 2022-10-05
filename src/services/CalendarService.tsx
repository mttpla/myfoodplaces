import { Place, SearchParams } from "../Type";

export class CalendarService {
  private DEFAULT_CALENDAR_ID = "primary";
  private calendarName = "MyFoodPlacesApp";
  private calendarId = this.DEFAULT_CALENDAR_ID;
  private client: any;
  private calendar: any;

  init(gapi: any) {
    console.log("CalendarService init", gapi);
    this.client = gapi.client;
    this.calendar = gapi.client.calendar;
    this.setCalendar();
  }

  private mapPlaceToGoogleEvent(place: Place): (any) {
    const gevent: any = {
      id: place.eventId,
      created: place.created,
      updated: place.updated,
      summary: place.summary,
      location: place.location,
      description: {
        vote: place.vote,
        comment: place.comment,
        price: place.price,
      },
      start : { date: place.date },
    }
    return gevent;
  }

  private mapGoogleEventToPlace(event: any):(Place) {
    const place: Place = {
      eventId: event.id,
      created: event.created,
      updated: event.updated,
      summary: event.summary,
      location: event.location,
      date: event.start.date || event.start.dateTime,
      vote: event.description?.vote,
      comment: event.description?.comment,
      price: event.description?.price,
    };
    
    return place;
  }

  private checkGapi = (): boolean => {
    if (this.client && this.client.getToken() && this.calendar) {
      return true;
    } else {
      console.error("Gapi not loaded");
      return false;
    }
  };

  isReady = (): boolean => {
    if (this.checkGapi() && this.calendarId !== this.DEFAULT_CALENDAR_ID) {
      return true;
    } else {
      console.error("CalendarService not ready");
      return false;
    }
  };

  private async setCalendar(): Promise<void> {
    if (this.checkGapi()) {
      const calList = (await this.calendar.calendarList.list()).result.items;
      let cal = calList.find((obj: { summary: string }) => {
        return obj.summary === this.calendarName;
      });
      if (!cal) {
        cal = await this.calendar.calendars.insert({
          summary: this.calendarName,
        }).result;
      }
      this.calendarId = cal.id;
    }
    console.log("calendar selected: ", this.calendarId);
  }

  async createPlace(place: Place) {
    if (this.isReady()) {
      const event = this.mapPlaceToGoogleEvent(place);
      /* console.log(
        "direct result",
        await this.client.calendar.events.insert({
          calendarId: this.calendarId,
          resource: gevent,
        })
      ); */
    }
  }

  async getPlaces(search: SearchParams): Promise<Place[]> {
    if (this.isReady()) {
      console.log("run getPlaces: ", this.calendarId);
      const events = (
        await this.calendar.events.list({
          calendarId: this.calendarId,
          showDeleted: false,
          singleEvents: true,
          timeMin: search.timeMin.toISOString(),
          timeMax: search.timeMax.toISOString(),
          q: search.text,
          orderBy: "startTime",
          maxResults: 50,
        })
      ).result.items;
      console.log("res: ", events);

      return events.map((gevent: any) => this.mapGoogleEventToPlace(gevent));
    }
    return [];
  }
}
