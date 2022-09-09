import { Product } from "./product";

export class Batch  {

    public id!:number;
    public id_produto!:number;
    public lote!:string;
    public validade!:string;
    public qtd_inicial!:number;
    public qtd_disponivel!:number;
    public data_cadastro!:Date;
    public fabricante!:string;
    public id_func_cadastro!:string;
    public deletado!:boolean;
    public produto!:Product;

    static initializeWithJson(jsonstring:string):Batch{
        return Object.assign(new Batch,JSON.parse(jsonstring));
    }

}