import { baserepository } from "./base-repository";
import { Activity } from "../models/activity";

export class Activityrepository implements baserepository<Activity>{

    uow = undefined;
    
    constructor(uow){
        this.uow = uow;
    }

    findAll(callback: any) {
        this.uow.query('select * from activity',[],(results)=>{
            return callback(results);
        });
    }    
    
    findById(id: string, callback: any) {
        this.uow.query('select * from activity where id = ?',[id],(results)=>{
            return callback(results);
        });
    }

    Add(value: Activity, callback: any) {
        this.uow.query('insert into activity (time,date,activity) values (?,?,?)',[value.time,value.date,value.activity],(results)=>{
            return callback(results);
        });
        this.uow.saveChanges();
    }

    Update(value: Activity, callback: any) {
        this.uow.query('update activity set time = ?, date = ? ,activity = ? where id = ?',[value.time,value.date,value.activity,value.id],(results)=>{
            return callback(results);
        });
        this.uow.saveChanges();
    }

    Remove(value: Activity, callback: any) {
        console.log(value.id);
        this.uow.query('delete from activity where id = ?',[value.id],(result)=>{
            return callback(result);
        });
        this.uow.saveChanges();
    }


}