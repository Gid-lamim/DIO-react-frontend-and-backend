import { Router, Request, Response, NextFunction} from "express";
import userRepository from "../repositories/user.repository";

/*operations we want to perform
    CRUD Create, read, update and delete

    get / users    
    get /users/:uuid   get user by id
    post /users    save new user
    put /users/:uuid    edit user by id
    delete / users/:uuid delete user by id
*/

const userRoute = Router();

//an express function needs three parameters: request, response and next function.
// http:localhost:3000/users
userRoute.get('/users', async (req:Request, res:Response, next:NextFunction)=>{
     
    console.log(req.headers); //this will show the headers
    
    const users = await userRepository.findAllUser();
    //await is used to tell javascript to stop and wait for the promise before proceeding.
    res.status(200).send({users})
    ;
});

//this route will be used o locate a user by its id.
//with express, we use ':' to say that the next part of the url is dynamic(variable)
userRoute.get('/users/:uuid', async (req:Request<{uuid:string}>, res:Response, next:NextFunction)=>{
    try{
        //req.params will give me the value entered in the url.
        //for example: http:localhost:3000/users/1234 will have 1234 as uuid
        const uuid = req.params.uuid;
        const user = await userRepository.findByUuid(uuid);

        res.status(200).send(user);
    }catch(error){
       next(error);
       //this function will run as a next step. should it hava an error, it will run.
    }
});

//now let's create a route to create a new user.
//to use POST we need postman or other apps. We can't use the browser.
userRoute.post('/users', async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const newUser = req.body;
        const uuidGenerated = await userRepository.createUser(newUser);
        res.status(201).send(uuidGenerated);
    }catch(error){
        next(error);
    }
});


userRoute.put('/users', async (req:Request, res:Response, next:NextFunction)=>{
    try{
        // instead of getting the uuid through the url, it will get from the request body 
        const user = req.body;
        await userRepository.updateUser(user)
        res.status(200).send(user);
    }catch(error){
        next(error);
    }
});

userRoute.delete('/users/:uuid', async (req:Request <{uuid: string}>, res:Response, next:NextFunction)=>{
    try{
        const uuid = req.params.uuid;
        await userRepository.removeUser(uuid);
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
});

export default userRoute;