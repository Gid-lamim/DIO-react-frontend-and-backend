//this file is responsible for the database setup
//it's simple

import { Pool } from 'pg';
import dbKey from "./dbKey";

const connectionString = dbKey;

const db = new Pool({ connectionString});

export default db;