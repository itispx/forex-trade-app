declare global {
  namespace Express {
    export interface Request {
      accessTokenID: string | undefined;
    }
  }
}

// Make the file a module and avoid the TypeScript error
export {};
