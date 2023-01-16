import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      reactivateUser: {
        id: string;
      };
    }
  }
}

export {};