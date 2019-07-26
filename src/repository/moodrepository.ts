import { baserepository } from "./base-repository";
import { moods } from "../models/mood";

export class MoodRepository implements baserepository<moods>{

    uow = undefined;
    
    constructor(uow){
        this.uow = uow;
    }

    findAll(callback) {
        this.uow.query('select * from mood',[],(results:any)=>{
            return callback(results);
        })
    }

    findById(id: string,callback): any {
        this.uow.query('select * from mood where id = ?',[id],(results)=>{
            return callback(results);
        })
    }

    Add(value: moods,callback) {
        this.uow.query('insert into mood (time,date,mood) values(?,?,?)',[value.time,value.date,value.mood],(results)=>{
            return callback(results);
        });
        this.uow.saveChanges()
    }

    Update(value: moods,callback) {
        this.uow.query('update mood set time = ? , date = ? , mood = ? where id = ?',[value.time,value.date,value.mood,value.id],(results)=>{
            return callback(results);
        });
        this.uow.saveChanges()
    }
    
    Remove(value: moods,callback) {
        this.uow.query('delete from mood where id = ?',[value.id],(results)=>{
            return callback(results);
        });
        this.uow.saveChanges();
    }
}