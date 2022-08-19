declare module Express {
  export interface IncomingMessage {}

  export interface Request {
    user: any;
  }
}
