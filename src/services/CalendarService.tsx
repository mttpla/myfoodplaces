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

  private mapMfpEventToGoogle(event: MfpEvent) {
    let gevent;
    // TODO
    gevent = event;
    return gevent;
  }

  private checkGapi = (): boolean => {
    if (this.client && this.client.getToken() && this.client.calendar) {
      return true;
    } else {
      console.error("Error: gapi not loaded");
      return false;
    }
  };

  private async setCalendar(): Promise<void> {
    if (this.checkGapi()) {
      const calList = (await this.client.calendar.calendarList.list()).result.items;
      let cal = calList.find((obj: { summary: string }) => {
        return obj.summary === this.calendarName;
      });
      if (!cal) {
        cal = await this.client.calendar.calendars.insert({
          summary: this.calendarName,
        }).result;
      }
      this.calendarId = cal.id;
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
