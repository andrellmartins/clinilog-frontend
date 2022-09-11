import { User } from "src/SystemModules/general/model/user";
import { Employee } from "./employee";
import { Patient } from "./patient";

export class Person {

    public id!:number;
    public nome!:string;
    public cpf!:string;
    public ender!:string;
    public cep!:number;
    public data_nasc!:string;
    public sexo!:string;
    public deletado!:boolean;
    public employee!:Employee;
    public paciente!:Patient;
    public usuario!:User;
    
    static initializeWithJson(jsonString:string):Person{
        return Object.assign(new Person,JSON.parse(jsonString));
    }

}