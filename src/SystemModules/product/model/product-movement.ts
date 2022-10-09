import { Batch } from "./batch";
import { Product } from "./product";

export class ProductMovement  {

    public id              !: number ;
    public qtd_movimentada !: number ;
    public data_cadastro   !: Date   ;
    public lote            !: Batch  ;
    public product         !: Product;

    static initializeWithJson( jsonstring:string): ProductMovement {
        return Object.assign(new ProductMovement,JSON.parse( jsonstring));
    }

}