import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/SystemModules/product/service/product.service';
import { Product } from '../../model/product';


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  public produtos!:Product[];

  public productColumns = [
    'descricao',
    'isMed',
    'data_cadastro',
  ];

  constructor( private productService:ProductService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(){
    this.productService.consultaProduto()
    .subscribe({
      next: (produtos:Product[]) => {
        this.produtos = produtos;
      },
      error(err) {
          console.log(err)
      },
    })
  }

}
