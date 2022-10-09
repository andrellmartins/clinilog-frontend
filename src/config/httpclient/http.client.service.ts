import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class HttpClientService{
    constructor(
        private httpClient:HttpClient
    ){

    }
    public get(url:string, params?:any){
        return this.httpClient.get(
            url,
            {
                ...(!!params ? {params} : {}),
                headers:this.headers()
            }
        ).pipe(map((response:any) => response));
    }

    public post(url:string, params:any){
        return this.httpClient.post(
            url,
            this.handleParams(params),
            {
                headers:this.headers(params)
            }
        ).pipe(map((response:any) => {
            return response
        }));
    }
    
    public put(url:string, params:any){
        return this.httpClient.put(
            url,
            this.handleParams(params),
            {
                headers: this.headers(params)
            }
        ).pipe(map((response:any) => {
            return response
        }));
    }
    
    public delete(url:string, params?:any){
        return this.httpClient.delete(
            url,
            {
                ...(!!params ? {params} : {}),
                headers:this.headers(params)
            }
        ).pipe(map((response:any) => response));
    }

    public headers(params?:any):HttpHeaders{
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers
        .set('Content-type', 'application/json')
        return headers;
    }

    private handleParams(params:any):any{
        if(typeof params == 'string'){
            return `${params}`
        }
        return {...(params ? params : {})};
    }

    handleError(response: Response) {
        throw new Error;
    }
}