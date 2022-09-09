import { Employee } from "./employee";

export class Doctor {

    public id!: number;
    public crm!: number;
    public crm_uf!: string;
    public func!:Employee;

    static initializeWithJson(jsonString:string):Doctor{
        return Object.assign(new Doctor,JSON.parse(jsonString));
    }

}