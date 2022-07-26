import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware (req:Request, res:Response, next:NextFunction){
    try {
        const authorizationHEader = req.headers['authorization']; // this will get the authorization from the request header.
        //now I need to check wheather the authorization exists or not.
        if (!authorizationHEader) {
            throw new ForbiddenError('Credencias não informadas');
            //in the real world, it's not a good idea to use intuitive messages like this one. 
        }

        //'Basic YWRtaW46YWRtaW4   the authentication will come this way, separated by a space.
        // we need to use destructuring to get the two values. 
        const [authenticationType, token ] = authorizationHEader.split(' ');

        //now we need if the authentication type is Basic and the token exists
        if (authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

       const tokenContent = Buffer.from(token, 'base64').toString('utf-8'); 
       
       //the toke will be converted to user:password  ex: admin:admin
       const [username, password] = tokenContent.split(':');
       
       //check if the username and password were given
       if (!username || !password){
        throw new ForbiddenError('Usuário e senha não preenchidos');
       }

       //it'll look for this user in the database now.
       const user = await userRepository.findUserByUsernameAndPassword(username,password); 
       
       //user is possibly null, so I need to take care of that first.
       if(!user){
        throw new ForbiddenError('usuário ou senha inválidos');
       }

       //we need to pass this nformation along to the next function.
       // we can use the req, but it doesn't have a user property in Express.
       //first we need to create one. 
       req.user = user;

       //now the user is in the request body. 

       next();
    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;