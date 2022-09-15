import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { ClienteDTO } from '../dto/clienteDTO';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  editarUsuario(clienteDTO: Person): Observable<Person>{
    return this.httpClient.put('/person/',clienteDTO);
  }
  excluirPessoa(idPerson: number):Observable<boolean>{
    return this.httpClient.delete('/person/'+idPerson);
  }

  constructor(
    private httpClient:HttpClientService
  ) { 
  }
  public cadastrarUsuario(clienteDTO:Person):Observable<Person>{
    return this.httpClient.post('/person/',clienteDTO);
  }
  public consultaPessoa(idPessoa:number | undefined):Observable<Person>{
    return this.httpClient.get('/person/'+idPessoa);
  }

  public consultaPessoas():Observable<Person[]>{
    return this.httpClient.get('/person/');
  }
}
