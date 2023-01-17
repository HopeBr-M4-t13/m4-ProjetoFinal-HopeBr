import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../errors/AppError";
import { boolean } from "yup";

const verifyAuthMiddleware = async (request: Request, response: Response, next: NextFunction):Promise<any> => {
  let token = request.headers.authorization;
  if (!token) {
    throw new AppError("Invalid Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
        
    if (error) {
      return response.status(401).json(error);
    }

    request.user = {
      id: decoded.sub,
      isAdmin: decoded.isAdmin,
    };
    return next();
  });
};

export default verifyAuthMiddleware;
