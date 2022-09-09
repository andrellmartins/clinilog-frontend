import { Product } from "./product";

export class Medicine {

    public id!:number;
    public id_produto!:number;
    public principio_ativo!:string;
    public deletado!:boolean;
    public produto!:Product;

    static initializeWithJson(jsonstring:string):Medicine{
        return Object.assign(new Medicine,JSON.parse(jsonstring));
    }

}