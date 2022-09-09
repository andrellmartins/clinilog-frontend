import { Person } from "src/SystemModules/person/model/person";

export class User{

    public id!:number;
    public login!:string;
    public username!:string;
    public password!:string;
    public firstName!:string;
    public lastName!:string;
    public dtCreation!:Date;
    public dtUpdate!:Date;
    public pessoa!:Person;
    
    static initializeWithJson(jsonstring:string):User{
        return Object.assign(new User,JSON.parse(jsonstring));
    }
}