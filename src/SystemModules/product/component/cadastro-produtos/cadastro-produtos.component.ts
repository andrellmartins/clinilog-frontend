import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { ProductService } from 'src/SystemModules/general/service/product.service';
import { ProductDTO } from '../../dto/produtoDTO';
import { Batch } from '../../model/batch';
import { Medicine } from '../../model/medicine';
import { Product } from '../../model/product';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  productDTO!:ProductDTO;
  productDTOForm!:FormGroup;

  //Input View
  @ViewChild("swalService") swalService!:SwalComponent;

  constructor(
    private productService:ProductService,
  ) {
    this.productDTOForm = new FormGroup({
      product_descricao: new FormControl('',[FormValidator.required,]),
      tipo_produto: new FormControl('',[FormValidator.required,]),
      med_principio: new FormControl('',[FormValidator.required,]),
    });
   }

  ngOnInit(): void {
  }

  iniciarVariaveis(){
    //this.productDTO = new Product();
    this.productDTO.product = new Product;
    this.productDTO.product.medicamento = new Medicine;
      
  }
  
  iniciarFormValidator(){
    
    }

}
