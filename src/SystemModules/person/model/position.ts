import { Employee } from "./employee";

export class Position {

    public id!:number;
    public cargo!:string;
    public func!:Employee;

    static initializeWithJson(jsonstring:string):Position{
        return Object.assign(new Position,JSON.parse(jsonstring));
    }

}