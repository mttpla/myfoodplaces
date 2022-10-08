import { FeedbackMessage, Place } from "./Type";

export const defaultPlace : Place = {
      summary: "name",
      date: new Date().toISOString(),
}

export const defaultFeedbackMessage: FeedbackMessage = {
  open: false,
  severity: "success",
  text: ""
}

export const genericErrorMessage: string = "Error"
export const genericSuccessMessage: string = "OK";

 
