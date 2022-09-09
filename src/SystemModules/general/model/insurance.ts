import { Patient } from "src/SystemModules/person/model/patient";

export class Insurance {

    public id!:number;
    public convenio!:string;
    public paciente!:Patient;

    static initializeWithJson(jsonstring:string):Insurance{
        return Object.assign(new Insurance,JSON.parse(jsonstring));
    }

}