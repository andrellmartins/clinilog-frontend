import { Batch } from "./batch";
import { Product } from "./product";

export class ReportProductMovementDTO {

    public produtos       !:Product[] ;
    public lotes          !:Batch[]   ;
    public conciliar_lote !:boolean   ;
    public data_inicio    !:string    ;
    public data_fim       !:string    ;
  

    static initializeWithJson(jsonstring:string):ReportProductMovementDTO{
        return Object.assign(new ReportProductMovementDTO,JSON.parse(jsonstring));
    }

}
