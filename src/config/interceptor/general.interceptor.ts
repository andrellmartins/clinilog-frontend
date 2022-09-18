import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaderResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {  catchError, map, Observable, of, tap } from 'rxjs';
import { UserService } from 'src/SystemModules/general/service/user.service';
import { User } from 'src/SystemModules/general/model/user';
import { UrlTree } from '@angular/router';
import { Person } from 'src/SystemModules/person/model/person';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  constructor(
    private userService:UserService
  ) {}

  private readonly server_url = 'http://127.0.0.1:8080'; 

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.beforeRequest(request);
    return this.afterRequest(
      next.handle(request),
      request
    );
  }

  beforeRequest(request:HttpRequest<unknown>){
    const bearer:string|null = this.getBearerToken();
    let setHeaders:any = {}
    if(bearer !== null){
      setHeaders.authorization = bearer;
    }
    return request.clone({
      url:this.server_url + request.url,
      setHeaders:setHeaders
    });
  }
  
  afterRequest(
    response:Observable<HttpEvent<unknown>>, 
    request:HttpRequest<unknown>
  ):Observable<HttpEvent<unknown>>{
      return response.pipe(
        tap((response:HttpEvent<unknown>) => {
          if(response instanceof HttpResponse){
            const authorizationHeader:string|null = response.headers.get('authorization');
            if(authorizationHeader != null && authorizationHeader.includes('Bearer')){
              console.log(request);
              if(  response.body instanceof Object
                && request instanceof Object 
                && request.body instanceof Object 
              ){
                console.log(request.body)
                let userResponse:Person = new Person(response.body);
                let userRequest:User  = new User(request.body);
                userResponse.usuario.password = userRequest.password;
                this.setBearerToken(authorizationHeader)
                UserService.setCurrentUser(userResponse);
              }
            }
          }
          console.log(response, UserService.getCurrentUser())
          return response;
        }),
        catchError((err:any, caught:Observable<HttpEvent<unknown>>) => {
          console.log(err)
          if(err instanceof HttpErrorResponse && err.status == 403 && err.url !== this.server_url + '/login'){
            const currentUser:Person|null = UserService.getCurrentUser();
            console.log(currentUser);
            if(currentUser == null){
              throw err;
            }
            return this.userService.login(currentUser.usuario).pipe(
              map((user:Person) => {
                UserService.setCurrentUser(user);
                throw new Error("Sessão Perdida e Restaurada");
              }),
              catchError((err:Error) => {
                  if(err.message.includes("Sessão Perdida e Restaurada")){
                    window.location.reload();
                    throw err;
                  }
                  confirm('Seu Login expirou!');
                  console.log("Sessão Limpa")
                  localStorage.clear();
                  window.location.href='/';
                  throw err;
              }),
            );
          }
          throw err;
        }) 
      )
  }

  getBearerToken():string|null{
    return localStorage.getItem('bearerToken');
  }

  setBearerToken(bearerToken:string){
    localStorage.setItem('bearerToken',bearerToken);
  }

}
