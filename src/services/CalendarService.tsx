import { MfpEvent } from "../Type";

export class CalendarService {
  calendarName = "MyFoodPlacesApp";
  calendarId = "primary";
  client: any;

  constructor(gapi: any) {
    console.log("constructor", gapi);
    this.client = gapi.client;
    this.setCalendar();
  }

  mapMfpEventToGoogle(event: MfpEvent) {
    let gevent;
    // TODO
    gevent = event;
    return gevent;
  }

  checkGapi = (): boolean => {
    if (this.client && this.client.getToken() && this.client.calendar) {
      return true;
    } else {
      console.error("Error: gapi not loaded");
      return false;
    }
  };

  async setCalendar(): Promise<void> {
    if (this.checkGapi()) {
      const calList = (await this.client.calendar.calendarList.list()).result.items;
      let mfpCalendar = calList.find((obj: { summary: string }) => {
        return obj.summary === this.calendarName;
      });
      if (!mfpCalendar) {
        mfpCalendar = await this.client.calendar.calendars.insert({
          summary: this.calendarName,
        }).result;
      }
      this.calendarId = mfpCalendar.id;
    }
  }

  async createEvent(event: MfpEvent) {
    if (this.checkGapi()) {
      const gevent = this.mapMfpEventToGoogle(event);
      /* console.log(
        "direct result",
        await this.client.calendar.events.insert({
          calendarId: this.calendarId,
          resource: gevent,
        })
      ); */
    }
  }
}
