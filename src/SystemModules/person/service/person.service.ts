import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { clienteDTO } from '../dto/clienteDTO';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private httpClient:HttpClientService
  ) { 
  }
  public fazerCadastro(clienteDTO:clienteDTO):Observable<boolean>{
    return this.httpClient.post('/user/cadastro',clienteDTO).pipe(
      map(
        (response:Response):boolean => {
          if(response.headers.has('status') && response.headers.get('status') == '200'){
            return true;
          }
          this.httpClient.handleError(response);
          return false;
        }
      )
    );

  }
}
