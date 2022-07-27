import { throws } from "assert";
import DataBaseError from "../models/errors/database.error.model";
import Message from "../models/message.model";
import db from "../routes/db";


class MessageRepository{
    
    
    async findAllMessages(): Promise<Message[]> { //it'll return a message
        try {
            const sqlQuery = `
            SELECT uuid, email, message, TO_CHAR(creationdate, 'MM/DD/YY hh:mm') AS creationdate
            FROM eshop_messages
            `;
            // how to use to_char   -->  https://dataschool.com/learn-sql/dates/
            
            const {rows} = await db.query<Message>(sqlQuery);
            
            return rows;
        } catch (error) {
            throw new DataBaseError('');
        }
        
    }

    async createMessage (message: Message): Promise<string>{
        try{
            const sqlScript = `
                INSERT INTO eshop_messages
                (
                    email, message, creationdate                    
                ) 
                VALUES ($1, $2, now())
                RETURNING uuid
            `;
            // RETURNING uuid   -->  it asks the database to return the generated uuid
            // now() will enter the current date when the message is created 
            const values = [message.email, message.message];
            
            const { rows } = await db.query<{uuid:string}>(sqlScript,values); //here we run the sql code to add the user. it will return a list of rows with one columns, the uuid column.

            const [ newMessage ] = rows; // here we get the first row of the list of rows.

            return newMessage .uuid;
        }catch(error){
            throw new DataBaseError('bad request');
        }
   
    }

}

export default new MessageRepository;