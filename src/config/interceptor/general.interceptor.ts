import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.beforeRequest(request);
    return this.afterRequest(next.handle(request));
  }

  beforeRequest(request:HttpRequest<unknown>){
    const bearer:string|null = this.getBearerToken();
    if(bearer !== null && !request.headers.has("Authorization")){
      request.headers.set("Authorization",`Bearer ${bearer}`);
    } else {
      request.headers.delete("Authorization");
    }
    return request.clone({
      url:'http://127.0.0.1:8080' + request.url
    });
  }
  
  afterRequest(response:Observable<HttpEvent<unknown>>):Observable<HttpEvent<unknown>>{
    return response
  }

  getBearerToken():string|null{
    return localStorage.getItem('bearerToken');
  }

  setBearerToken(bearerToken:string){
    localStorage.setItem('bearerToken',bearerToken);
  }

}
