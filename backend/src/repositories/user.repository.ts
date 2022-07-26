import { query } from "express";
import DataBaseError from "../models/errors/database.error.model";
import User from "../models/user.model";
import db from "../routes/db";


class UserRepository{
    
    async findAllUser (): Promise<User[]> {
        const sqlQuery = `
            SELECT username, uuid 
            FROM application_user
        `;
        
    const {rows} = await db.query<User>(sqlQuery);
    
    return rows || [];
    }

    //function takes the string id as a parameter and returns a promise
     async findByUuid (uuid: string): Promise<User> {
        try{
            const query = `
                SELECT username, uuid 
                FROM application_user 
                WHERE uuid = $1
            `;

            //the $1 sign allows us to pass a variable into the sql query.
            /*if I don't do it, I allow whats called sql injection:
            
                SQL injection is a code injection technique that might destroy your database.

                SQL injection is one of the most common web hacking techniques.

                SQL injection is the placement of malicious code in SQL statements, via web page input.?
            */

            const values = [uuid];

            const {rows} = await db.query<User>(query, values);
            
            const [ user ] = rows;
            //   const [ user ] = rows;   -->    is the same as    -->    const user = rows;       that's called array deestructuring

            return user;
        }catch(error){
            throw new DataBaseError('bad request');
        }
        

    }

    async findUserByUsernameAndPassword(username:string, password:string): Promise<User | null>{
        try {
            const query = `
            SELECT uuid, username
            FROM application_user
            WHERE username = $1
            AND password = crypt($2,'my_crypt')
            `;
            const values = [username, password];

            const { rows } = await db.query<User>(query,values);

            const [user] = rows;

            //if it doesn't find any user, it returns null
            return user || null;
        } catch (error) {
            throw new DataBaseError('erro na consulta');
        }
        
    }

    async createUser (user: User): Promise<string>{
            try{
                const sqlScript = `
                    INSERT INTO application_user
                    (
                        username,
                        password
                    ) 
                    VALUES ($1, crypt($2,'my_crypt'))
                    RETURNING uuid
                `;
                // RETURNING uuid   -->  it asks the database to return the generated uuid
                
                const values = [user.username, user.password];
                
                const { rows } = await db.query<{uuid:string}>(sqlScript,values); //here we run the sql code to add the user. it will return a list of rows with one columns, the uuid column.

                const [ newUser ] = rows; // here we get the first row of the list of rows.

                return newUser.uuid;
            }catch(error){
                throw new DataBaseError('bad request');
            }
       
    }

    async updateUser (user: User): Promise<void>{
        try{
            const slqScript = `
                UPDATE application_user
                SET 
                    username = $1,
                    password = crypt($2,'my_crypt')
                WHERE uuid = $3
            `;
            // basically it says, modify the username to be x and password to be y where the uuid equals w.

            const values = [user.username, user.password, user.uuid];
            await db.query(slqScript, values);
        }catch(error){
            throw new DataBaseError('bad request');
        }

    }

    async removeUser(uuid:string): Promise<void>{
        try{
            const splScript = `
                DELETE FROM application_user
                WHERE uuid = $1;
            `;

            const values = [uuid];

            await db.query(splScript, values);
        }catch(error){
            throw new DataBaseError('bad request');
        }

    }
}

export default new UserRepository;