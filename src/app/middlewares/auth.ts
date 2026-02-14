import { NextFunction, Request, Response } from "express";

import { JwtHelpers } from "../helper/jwtHelpers";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../error/ApiError";
import httpStatus from "http-status";

const auth = (...roles: string[])=>{return async(req:Request & { user?: JwtPayload }, res:Response, next:NextFunction)=>{
    try{
        const token = req.cookies.accessToken

        if(!token){
            throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized")
        }

        const verifyUser = JwtHelpers.verifyToken(token, config.jwt.accessSecret as string);
        req.user = verifyUser;
            
        
        if(roles.length && !roles.includes(verifyUser.role)){
            throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized")
        }
        next();
    }
    catch(err){
        next(err);
    }
}}

export default auth;