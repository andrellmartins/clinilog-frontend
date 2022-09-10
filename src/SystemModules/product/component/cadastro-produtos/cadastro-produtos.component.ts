import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductDTO } from '../../dto/produtoDTO';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  productDTO!:ProductDTO;
  productDTOForm!:FormGroup;


  constructor() {
    
   }

  ngOnInit(): void {
  }

}
