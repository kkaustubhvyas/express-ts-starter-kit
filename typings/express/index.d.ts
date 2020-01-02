declare module Express {
  export interface IncomingMessage { }

  export interface Request {
    context: any;
    uploads: {
      [key: string]: any
    }
  }
}