export class Activity{
    id?:number;
    time:string;
    date:Date;
    activity:string;

    constructor(id:number,time:string,date:Date,activity:string){
        this.id=id;
        this.time=time;
        this.date=date;
        this.activity=activity;
    }
}