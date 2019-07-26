import mysql from 'mysql';
import _config from '../config.json'
import {dbcontext} from './dbcontext';

const config = _config.Database.development;
let db = undefined;

const _dbconn = mysql.createPool({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database,
    connectionLimit:config.connectionLimit
});

export class UnitOfWorkFactory{
        create(callback:any){
        _dbconn.getConnection((err,connection)=>{
            db = new dbcontext(connection);
            return callback(db);
        })
    }
}