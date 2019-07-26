export class moods{
    id?:number;
    time:string;
    date:Date;
    mood:string;

    constructor(id:number,time:string,date:Date,mood:string){
        this.id=id;
        this.time=time;
        this.date=date;
        this.mood=mood;
        
    }
}