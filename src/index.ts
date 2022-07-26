import express, { NextFunction, Request, Response } from "express";
import basicAuthenticationMiddleware from "./middlewares/basic-authentication.middleware";
import jwtbearerAuthenticationMiddleware from "./middlewares/jwtBearer-authentication.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import userRoute from "./routes/users.route";

const app = express();

//basic setup for express
app.use(express.json()); //this will enable the code to understand json bodies
app.use(express.urlencoded({extended:true}));

//Routes imports
// here the order counts. 
app.use(statusRoute); // this route doesn't need authentication
app.use(authorizationRoute); // these route are used to get or validadte a token. 
app.use(jwtbearerAuthenticationMiddleware, userRoute); //this ensures that all user routes are authenticated. The access without a token is simply not allowed

/* if I put app.use(authorizationRoute) before app.use(statusRoute),
 it will ask for an authentication before we can check the api status*/


//errorHandlers
app.use(errorHandler); //this will take care of all errors

app.listen(3000, ()=>{ // to access this:  http://localhost:3000
    console.log('porta 3000 ');
})
// this way, we can create a server very easily 