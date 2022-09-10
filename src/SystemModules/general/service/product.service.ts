import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { ProductDTO } from 'src/SystemModules/product/dto/produtoDTO';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  
  consultarProduto(nrPrd: number): Observable<ProductDTO> {
    return this.httpClient.get('/prod',{nrPrd: nrPrd});
  }
}
