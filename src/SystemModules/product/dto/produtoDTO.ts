import { Product } from "../model/product";
import { Medicine } from "../model/medicine";
import { Batch } from "../model/batch";

export class ProductDTO{
    product!:Product;
    medicine!:Medicine;
    batch!:Batch;
    
}