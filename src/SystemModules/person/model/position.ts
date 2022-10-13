import { Employee } from "./employee";

export class Position {

    public id!:number;
    public cargo!:string;
    public func!:Employee;
    public acesso_modulo_pessoas!:boolean;
    public acesso_modulo_estoque!:boolean;

    static initializeWithJson(object:any):Position{
        return Object.assign(new Position,object);
    }

}