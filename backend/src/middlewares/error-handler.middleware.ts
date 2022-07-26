import { NextFunction, Request, Response } from "express";
import DataBaseError from "../models/errors/database.error.model";
import ForbiddenError from "../models/errors/forbidden.error.model";


function errorHandler(error: any, req:Request,res:Response,next: NextFunction){
    if (error instanceof DataBaseError){
        res.status(400).send('bad request');
   }else if(error instanceof ForbiddenError){
        res.status(403).send('Forbidden');
   }else{
        res.status(500).send('internal server error');
   }

}
export default errorHandler;
