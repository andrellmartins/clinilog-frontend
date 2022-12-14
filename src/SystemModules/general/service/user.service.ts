import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { ClienteDTO } from 'src/SystemModules/person/dto/clienteDTO';
import { catchError, map, Observable, of } from 'rxjs';
import { Person } from 'src/SystemModules/person/model/person';
import { HttpResponse } from '@angular/common/http';
import { getCurrencySymbol } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  emailRecuperaSenha(email: string):Observable<boolean> {
    return this.httpClient.post('/user/recuperar-senha/email', email);
  }
  static readonly currentUserToken = 'currentUser';

  static getCurrentUser(): Person | null {
    const userString:string|null = localStorage.getItem(UserService.currentUserToken);
    if(userString == null){
      return null;
    }else{
      return Person.initializeWithJson(userString);
    }
  }
  
  static setCurrentUser(user:Person): void {
    localStorage.setItem(UserService.currentUserToken, JSON.stringify(user))
  }

  constructor(
    private httpClient: HttpClientService
  ) {}

  public login(usuario:User):Observable<Person>{
    return this.httpClient.post(
      '/login', 
      usuario
    );
  }
  
  public alterarSenha(idUsuario:number, newPassword:string ):Observable<boolean>{
    return this.httpClient.put(
      '/user/recuperar-senha/'+idUsuario, 
      newPassword
    );
  }

  consultarUsuario(nrUsr: number): Observable<Person> {
    return this.httpClient.get('/user',{nrUser: nrUsr});
  }
}
