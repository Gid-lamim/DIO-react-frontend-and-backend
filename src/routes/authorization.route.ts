import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT, { SignOptions } from 'jsonwebtoken';
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtbearerAuthenticationMiddleware from "../middlewares/jwtBearer-authentication.middleware";
import { time } from "console";
   
const authorizationRoute = Router();


authorizationRoute.post('/token', basicAuthenticationMiddleware,  async (req:Request, res:Response, next:NextFunction)=>{
    //this will use a basic authentication to generate a token that will later be used to access the user routes 
    try {

        const user = req.user;

        //as a precaution, let's check whether the user exists
        if(!user){
            throw new ForbiddenError("Usuário não informado");
        }

        /* Here we have some signature options.

            Issuer (iss)
            Subject (sub)
            Audience (aud)
            Expiration time (exp)
            Not before (nbf)
            Issued at (iat)
            JWT ID (jti)

            The subject claim (sub) normally describes to whom or to which application the JWT is issued. The issued at claim (iat) can be used to store the time at which the JWT is created, thus allowing JWTs to be invalidated after a certain amount of time. Other custom claims can be added.

            https://auth0.com/blog/json-web-token-signing-algorithms-overview/
                
       */
      /* expiresIn?: string | number | undefined;
         expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  
         Eg: 60, "2 days", "10h", "7d" */
   
        function sec (minutes: number){
            //this function will turn minutes into seconds
            //1m = 60s 
            const time = minutes * 60; 
            return time;
        }

       const jwtPayload = {username: user.username};
       const jwtOptions:SignOptions = {subject: user.uuid, expiresIn: sec(10) };
       const secretKey = 'my_secret_key'; 

       //the following line will generate the jwt token
       const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

       //the time in the token is given as unix timestamp https://www.unixtimestamp.com/

       //now the token will be sent back to the user as a response
       res.status(200).json({token:jwt});

       /* an example of response would be:
       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjU4NzY1MDQ3LCJzdWIiOiJhNzhlMWU3ZS1kYTEyLTQzNWYtOTAxZC05ZWRiZDhhYzg0OWIifQ.DIo-AfqPZmwwUFttZpIJS1ZHQnbfIHE6iK4o3014LdY
      
       now, using the JWT website (https://jwt.io/), we can translate this token and find out what information it holds:
       the payload is:
                {
                    "username": "admin",
                    "iat": 1658765047,
                    "sub": "a78e1e7e-da12-435f-901d-9edbd8ac849b"
                }
        */

    } catch (error) {
        next(error);
    }
        
})

authorizationRoute.post('/token/validate', jwtbearerAuthenticationMiddleware,  async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const now = Math.round(new Date().getTime() /1000); //given in milliseconds
        const expiresIn:number =  Math.round((req.user.expiresIn - now)/60);


        res.status(200).send(`Seu token irá expirar em: ${expiresIn} minutos`);

    } catch (error) {
        next(error);
    }

})

export default authorizationRoute;