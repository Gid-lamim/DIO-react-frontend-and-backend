import { Router, Request, Response, NextFunction} from "express";
import messageRepository from "../repositories/message.repository";


const messageRoute = Router();

//this will list all messages created by the customers
messageRoute.get('/messages', async (req:Request, res:Response, next:NextFunction)=>{

    //this will get the messages from the database
    const getMessages = await messageRepository.findAllMessages();

    //this will send the list with athe messages
    res.status(200).send(getMessages);
});

messageRoute.post('/messages', async (req:Request, res:Response, next:NextFunction)=>{
    try{
        /* exmple of body
            {
                "email": "gugbesh@goggles.com",
                "message": "Não gostei dos produto",
                "creationdate": "26/07/22"
	        }
        */
        const newMessage = req.body;
        const uuidGenerated = await messageRepository.createMessage(newMessage);
        res.status(201).send(uuidGenerated);
    }catch(error){
        next(error);
    }
});

export default messageRoute;