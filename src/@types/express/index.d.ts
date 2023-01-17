import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        isAdmin: boolean;
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
        isAdmin: boolean;
      };
    }
  }
}

export {};