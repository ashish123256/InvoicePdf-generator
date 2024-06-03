import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies['access_token'];
    if(!token) return next(errorHandler(401,"Unauthorized"));
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decoded as JwtPayload).userId;
        next();
        
      } catch (error) {
        res.status(401).json({ message: "unauthorized" });
      }
}