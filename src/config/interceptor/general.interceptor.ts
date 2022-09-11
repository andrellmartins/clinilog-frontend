import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {  map, Observable, tap } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  constructor() {}

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
      url:'http://127.0.0.1:8080' + request.url,
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
          }
        }
        return response;
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
