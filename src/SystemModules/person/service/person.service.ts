import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { ClienteDTO } from '../dto/clienteDTO';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private httpClient:HttpClientService
  ) { 
  }
  public cadastrarUsuario(clienteDTO:Person):Observable<Person>{
    return this.httpClient.post('/person/',clienteDTO);
  }
  public consultaPessoas():Observable<Person[]>{
    return this.httpClient.get('/person/');
  }
}
