import { Batch } from "./batch";
import { Medicine } from "./medicine";

export class Product {

    public id!:number;
    public descricao!:string;
    public isMed!:boolean;
    public id_lote!:number;
    public qtd_disponivel!:number;
    public qtd_minima!:number;
    public id_func_cadastro!:string;
    public data_cadastro!:Date;
    public deletado!:boolean;
    public lote?:Batch[];
    public medicamento?:Medicine;
  

    static initializeWithJson(jsonstring:string):Product{
        return Object.assign(new Product,JSON.parse(jsonstring));
    }

}