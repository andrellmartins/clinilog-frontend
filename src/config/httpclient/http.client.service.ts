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
        console.log(JSON.stringify(params ? params : {}));
        return this.httpClient.post(
            url,
            {...(params ? params : {})},
            {
                headers:this.headers()
            }
        ).pipe(map((response:any) => {
            console.log(response) 
            return response
        }));
    }
    public headers():HttpHeaders{
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers
            .set('Content-type', 'application/json')
        return headers;
    }

    handleError(response: Response) {
        throw new Error;
    }
}