import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { Position } from '../model/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private httpClient:HttpClientService
  ) { }

  consultarCargos():Observable<Position[]>{
    return this.httpClient.get('/position/').pipe(
      map(
        (e:Position[])=>{
          if(e !== null){
            return e;
          }
          return [];
        }
      )
    )
  }

}
