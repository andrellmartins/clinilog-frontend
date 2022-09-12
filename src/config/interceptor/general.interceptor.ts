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
import {  catchError, map, Observable, tap } from 'rxjs';
import { UserService } from 'src/SystemModules/general/service/user.service';
import { User } from 'src/SystemModules/general/model/user';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  constructor(
    private userService:UserService
  ) {}

  private readonly server_url = 'http://127.0.0.1:8080'; 

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.beforeRequest(request);
    return this.afterRequest(
      next.handle(request)
    );
  }

  beforeRequest(request:HttpRequest<unknown>){
    const bearer:string|null = this.getBearerToken();
    let setHeaders:any = {}
    if(bearer !== null){
      setHeaders.Authorization = bearer;
    }
    return request.clone({
      url:this.server_url + request.url,
      setHeaders:setHeaders
    });
  }
  
  afterRequest(response:Observable<HttpEvent<unknown>>):Observable<HttpEvent<unknown>>{
    return response.pipe(
      tap((response:HttpEvent<unknown>) => {
        if(response instanceof HttpResponse){
          const authorizationHeader:string|null = response.headers.get('authorization');
          if(authorizationHeader != null && authorizationHeader.includes('Bearer')){
            this.setBearerToken(authorizationHeader)
            if(typeof response.body == 'string' && response.body != ''){
              localStorage.setItem(UserService.currentUserToken, response.body);
            }
          }
        }
        return response;
      }),
      catchError((err:any, caught:Observable<HttpEvent<unknown>>) => {
        if(err instanceof HttpErrorResponse && err.status == 403 && err.url !== this.server_url + '/login'){
          const currentUser:User|null = UserService.getCurrentUser();
          if(currentUser == null){
            return caught;
          }
          this.userService.login(currentUser).subscribe({
            next(value) {
                confirm('Tentar Novamente Por Favor.')
            },
            error(err) {
                confirm('Seu Login expirou!');
                localStorage.clear();
                window.location.href='/';
            },
          });
          
        }
        throw caught;
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
