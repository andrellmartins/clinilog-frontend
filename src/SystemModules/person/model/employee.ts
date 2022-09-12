import { Doctor } from "./doctor";
import { Person } from "./person";
import { Pharma } from "./pharma";
import { Position } from "./position";

export class Employee {

    public id!:number;
    public pis!:number;
    public salario!:number;
    public pessoa!:Person;
    public cargo!:Position;
    public medico?:Doctor;
    public farma?:Pharma;

    static initializeWithJson(jsonstring:string):Employee{
        return Object.assign(new Employee,JSON.parse(jsonstring));
    }

}