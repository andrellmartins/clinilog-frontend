import { Insurance } from "src/SystemModules/general/model/insurance";
import { Person } from "./person";

export class Patient {

    public id!:number;
    public pessoa!:Person;
    public convenio!:Insurance;

    static initializeWithJson(jsonstring:string):Patient{
        return Object.assign(new Patient,JSON.parse(jsonstring));
    }

}