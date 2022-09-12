import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PositionConstants } from 'src/config/constants/position.constants';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { ProductService } from 'src/SystemModules/product/service/product.service';
import { Medicine } from '../../model/medicine';
import { Product } from '../../model/product';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  productDTO!:Product;
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
    this.iniciarVariaveis();
    this.iniciarProuductFormValidator();

   }

  ngOnInit(): void {
  }

  iniciarVariaveis(){
    this.productDTO = new Product();
    this.productDTO.medicamento = new Medicine;
      
  }
  
  iniciarProuductFormValidator(){
    this.productDTOForm = new FormGroup({
      product_descricao : new FormControl('',[FormValidator.required,]),
      tipo_produto: new FormControl('',[FormValidator.required,]),
      med_principio: new FormControl('',[FormValidator.required,])
    });

    this.productDTOForm.valueChanges
    .subscribe((currentProductDTOForm:any) => {
        this.productDTO.descricao =  currentProductDTOForm?.product_descricao;
        this.productDTO.isMed  =  this.isMed();
        if(this.productDTO.isMed){
          this.productDTO.medicamento.principio_ativo = currentProductDTOForm?.med_principio;
        }else{
          this.productDTO.medicamento = new Medicine();
        }
        console.log(this.productDTO);
    });
  }
  isMed() {
    return (this.productDTOForm.get("tipo_produto")?.value == "medicamento" );
  }

  fazerCadastroProdutos(){
    this.productService.cadastrarProduto(this.productDTO)
    .subscribe({
      next:(product:Product) => {
        this.swalService.titleText = "Sucesso ao Cadastrar";
        this.swalService.text = "Novo Produto " + product.descricao + " Cadastrado!";
        this.swalService.icon = "success";
        this.swalServiceClose = () => {
          window.location.href = '/inicio/produtos/';
        }
        this.swalService.fire();
      },
      error:(err:Error) => {
        this.swalService.titleText = "Falha ao Cadastrar";
        this.swalService.text = "Produto " + this.productDTO.descricao + " Não foi Cadastrado! \n Mensagem:" + err.message;
        this.swalService.icon = "error";
        this.swalServiceClose = () => {}
        this.swalService.fire();
      }
    });
  }

  swalServiceClose = () => {};



}
