import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';

function jwtbearerAuthenticationMiddleware (req:Request, res:Response, next:NextFunction){
    try {
        
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credencias não informadas');
            //in the real world, it's not a good idea to use intuitive messages like this one. 
        }

        const [authenticationType, token ] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }
        
        try{
                //now that we have the token, we can verify it
                //if I don't have the right token, I won't be able to retrieve the insformation
                //this way, using the private key, we can get the payload back.
                
                const secretKey = 'my_secret_key'; 
                const tokenPayload = JWT.verify(token, secretKey);

                /* an example of token payload:  
                
                sub: a78e1e7e-da12-435f-901d-9edbd8ac849b
                username: admin
                */


                //we have to make sure tha tokenPayload is an object before we can use its properties later.
                if (typeof tokenPayload !== 'object' || !tokenPayload.sub){
                    throw new ForbiddenError("token inválido");
                }

                const userUuid = tokenPayload.sub;
                const username = tokenPayload.username;
                const expiresIn = tokenPayload.exp;


                /*now we create an object for the user 
                    it has to be like this:
                    type User ={
                                    uuid?: string;
                                    username: string;
                                    password?:string;
                                }

                */

                const user = {uuid: userUuid, username: username, expiresIn:expiresIn}

                req.user = user;

                next(); // if there are no errors, it calls the next step.
        }catch(error){
            throw new ForbiddenError('Token inválido');
        }
        
    } catch (error) {
        next(error); //this will call the error handler.
    }
}

export default jwtbearerAuthenticationMiddleware;




//Bearer authentication (also called token authentication) is an HTTP authentication scheme that involves security tokens called bearer tokens.
//https://www.youtube.com/watch?v=2ZLHabaZZJs
//https://www.youtube.com/watch?v=BNEoKexlmA4

