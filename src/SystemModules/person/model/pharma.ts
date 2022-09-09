import { Employee } from "./employee";

export class Pharma  {

    public id!:number;
    public crf!:number;
    public crf_uf!:string;
    public func!:Employee;

    static initializeWithJson(jsonstring:string):Pharma{
        return Object.assign(new Pharma,JSON.parse(jsonstring));
    }

}