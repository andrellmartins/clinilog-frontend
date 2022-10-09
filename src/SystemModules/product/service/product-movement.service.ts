import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { ProductMovement } from '../model/product-movement';
import { ReportProductMovementDTO } from '../model/report-product-movement-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductMovementService {

  constructor(
    private httpClient:HttpClientService
  ) { }

  consultaDadosGrafico(
    reportProductMovement:ReportProductMovementDTO
  ):Observable<ProductMovement[]> {
    return this.httpClient.post(
      '/product-movement/chart-data',
      reportProductMovement
    );
  }

}
