import { AlertColor } from "@mui/material/Alert";

export interface UserInfoI {
  imageUrl?: string;
  name?: string;
  email?: string;
}

export interface Config {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: [string];
}

export interface Place {
  eventId?: string,
  created?: string,
  updated?: string,
  summary: string;
  vote?: number;
  comment?: string;
  price?: number;
  url?: string;  
  location?: string;
  date: string
}

export interface SearchParams {
  text: string;
  timeMin: Date;
  timeMax: Date;
}

export interface FeedbackMessage {
  text: string;
  severity: AlertColor;
  open: boolean;
}


