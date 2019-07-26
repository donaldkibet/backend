export class dbcontext{

    connection=undefined;

    constructor(connection){
        this.connection=connection;
    }

    query(sql,params,callback){
        this.connection.beginTransaction((err)=>{
            this.connection.query(sql,params,(errors,results)=>{
                if(err) this.connection.rollBack();
                return callback(results);
            })
        })
    }

    saveChanges(){
        this.connection.commit((err)=>{
            if(err) throw err;
        })
    }
}