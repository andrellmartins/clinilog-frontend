import { Injectable } from '@angular/core';
import { User } from '../../general/model/user';
import { HttpClientService } from 'src/config/httpclient/http.client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from '../../general/service/user.service';
import { ProductDTO } from 'src/SystemModules/product/dto/produtoDTO';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  excluirProduto(idProduto: number):Observable<boolean> {
    return this.httpClient.delete('/product/'+idProduto);
  }
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

  
  public consultaProdutos(): Observable<Product[]> {
    return this.httpClient.get('/product/');
  }
  
  public consultaProduto(idProduto:number): Observable<Product> {
    return this.httpClient.get('/product/'+idProduto);
  }

  public cadastrarProduto(productDTO:Product):Observable<Product>{
    return this.httpClient.post('/product/',productDTO);
  }
}
