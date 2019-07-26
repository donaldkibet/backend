export interface baserepository<T>{
    findAll(callback):any;
    findById(id:string,callback:any):any;

    Add(value:T,callback:any):any;
    Update(value:T,callback:any):any;
    Remove(value:T,callback:any):any;
}