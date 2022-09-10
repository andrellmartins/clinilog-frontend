import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { ClienteDTO } from 'src/SystemModules/person/dto/clienteDTO';
import { catchError, map, Observable, of } from 'rxjs';
import { Person } from 'src/SystemModules/person/model/person';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly currentUserToken = 'currentUser';

  static getCurrentUser(): User {
    const userString:string|null = localStorage.getItem(UserService.currentUserToken);
    if(userString == null){
      return new User;
    }else{
      return User.initializeWithJson(userString);
    }
  }

  constructor(
    private httpClient: HttpClientService
  ) {}

  public login(usuario:User):Observable<User>{
    return this.httpClient.post(
      '/login', 
      usuario
    ).pipe(
      map(
        (response:any):User => {
          console.log(response);
          if(response.status == 200 &&  response.headers.get("Authorization")?.includes("Bearer ") && response.body != null){
            response.json().then(
              (user:User) =>{
                localStorage.setItem(UserService.currentUserToken, JSON.stringify(user));
              }
            )
          }
          return UserService.getCurrentUser();
        }
      )
    );
  }

  consultarUsuario(nrUsr: number): Observable<Person> {
    return this.httpClient.get('/user',{nrUser: nrUsr});
  }
}
