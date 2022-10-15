import { FeedbackMessage, Place } from "./Type";

export const defaultPlace : Place = {
      summary: "name",
      date: new Date(),
}

export const defaultFeedbackMessage: FeedbackMessage = {
  open: false,
  severity: "success",
  text: "",
  autoHideDuration: 6000 
}

export const successFeedbackMessage: FeedbackMessage = {
  ...defaultFeedbackMessage,
  open: true,
};

export const errorFeedbackMessage: FeedbackMessage = {
  ...defaultFeedbackMessage,
  open: true,
  autoHideDuration: null,
};

export const genericErrorMessage: string = "Error";

 
