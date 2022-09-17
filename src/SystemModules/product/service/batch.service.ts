import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { Batch } from '../model/batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(
    private httpClient: HttpClientService
  ) { }

  cadastrarLotes(idProduto:number, lotes:Batch[]):Observable<boolean>{
    return this.httpClient.post('/batch/'+idProduto, lotes);
  }
}
