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

export interface MfpEvent {
  summary: string;
  description: {
    vote: number;
    comment: string;
    price: number;
  };
  location: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}


